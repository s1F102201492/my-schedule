import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { type, prompt, img } = await req.json();

    const prisma = new PrismaClient(); // インスタンス化
 
    let alltodos = []
 
    try {
        // ユーザーのタスクを取得
        alltodos = await prisma.todos.findMany();
    } catch (err) {
        return NextResponse.json({ message: 'Error', err }, { status: 500 });
    };

    const gptApiKey = process.env.OPENAI_API_KEY;
    const gptApiEndPoint = process.env.OPENAI_API_URL;

    if (!gptApiKey) {
        console.error('API keyがありません。');
        return NextResponse.json(
            { error: 'API keyがありません。' },
            { status: 500 },
        );
    }

    if (!gptApiEndPoint) {
        console.error('API URLがありません。');
        return NextResponse.json(
            { error: 'API URLがありません。' },
            { status: 500 },
        );
    }

    let SystemPrompt: string = ``;

    if (type === "recommend") { // AIrecommnedページに返答
        // プロンプト設定
        SystemPrompt = `あなたはおすすめの習慣を提案してください。アプリの利用者は自分が憧れている姿やなりたいもの、目標をテキストで書き、画像があれば画像をアップロードします。なのであなたはその内容を分析し利用者がなりたい姿やなりたいもの、目標を達成できるような習慣を５つ考えてください。 
        また、利用者の登録しているタスクとできるだけ被らないようにしてください。利用者のタスクはjson形式です。習慣名だけを挙げてください。番号や点や記号などは書かずに箇条書き(最初はハイフン)で書いてください。憧れている姿、なりたいもの、目標: ${prompt}, 画像: ${img}, 利用者のタスク: ${alltodos}`;

        const response = await fetch(`${gptApiEndPoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${gptApiKey}`,
            },
            body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'user',
                    content: img
                        ? [
                                { type: "text", text: SystemPrompt },
                                { type: "image_url", image_url: { url: img } } // 修正: `image_url` を正しく指定
                            ]
                        : SystemPrompt, // 修正: 画像なしの場合は `prompt` だけを送る
                    },
                ],
                max_tokens: 500,
                stream: false,
                temperature: 1.2,
            }),
        });

        const data = await response.json();

        //API処理が正常にできない場合
        if (!response.ok) {
            console.error(
            `APIリクエスト失敗: ${response.status} ${response.statusText}`,
            );
            const errorData = await response.json();
            console.error('エラーメッセージ:', errorData);

            return NextResponse.json(
                { error: 'APIリクエストが失敗しました。' },
                { status: response.status },
            );
        }

    // JSONデータをそのまま返す
    return NextResponse.json({ result: data.choices[0]?.message?.content });

    } else if (type === "model") { // modelページに返答
        if (prompt === '') {
            SystemPrompt = `あなたは、ユーザーのタスクデータをもとに、ユーザーが目指している「理想の自分」をイメージする役割です。
        ユーザーが行っている習慣の一覧:${JSON.stringify(alltodos)}
        主にtitle(タスク名),description(タスクの詳細や現状の記録),purpose(そのタスクを行う目的)から考えてください。
        これらの情報から、ユーザーのなりたい理想の姿を400文字以内で表現してください。
        理想の姿については、少し話を盛ってもかまいませんが、具体的に書いてください。（ユーザーがイメージしやすいように）`;
        } else {
            SystemPrompt = `あなたは、ユーザーのタスクデータをもとに、ユーザーが目指している「理想の自分」をイメージする役割です。
        ユーザーが行っている習慣の一覧:${JSON.stringify(alltodos)}
        主にtitle(タスク名),description(タスクの詳細や現状の記録),purpose(そのタスクを行う目的)から考えてください。
        これらの情報から、ユーザーのなりたい理想の姿を400文字以内で表現してください。
        理想の姿については、少し話を盛ってもかまいませんが、具体的に書いてください。（ユーザーがイメージしやすいように）
        また、ユーザーが条件を設定するのでその条件に関係のあるタスクのみに絞って回答をしてください。
        その条件に関係のないタスクについて言及するのは厳禁です。条件:${prompt}`;
        }
        
        const response = await fetch(`${gptApiEndPoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${gptApiKey}`,
            },
            body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
                    {
                        role: 'user',
                        content: SystemPrompt
                    }
                ],
                max_tokens: 1000,
                stream: true,
                temperature: 1.0,
            }),
        });

        // **ストリーミングレスポンスの処理**
        const readableStream = new ReadableStream({
            async start(controller) {
                const reader = response.body?.getReader();
                if (!reader) {
                    controller.close();
                    return;
                }

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    controller.enqueue(value);
                }
                controller.close();
            },
        });

        return new Response(readableStream, {
            headers: { 'Content-Type': 'text/event-stream' },
        });


    } else {
        console.log("エラーが発生しました。type: なし");
    }
}
