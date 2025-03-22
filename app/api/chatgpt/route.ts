import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { type, prompt, img } = await req.json();

    const prisma = new PrismaClient(); // インスタンス化
 
    let alltodos = []
    // タスクの取得
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

    if (type === "recommend") { // AIrecommnedページに返答
        // プロンプト設定
        const SystemPrompt: string = `あなたはおすすめの習慣を提案してください。アプリの利用者は自分が憧れている姿やなりたいもの、目標をテキストで書き、画像があれば画像をアップロードします。なのであなたはその内容を分析し利用者がなりたい姿やなりたいもの、目標を達成できるような習慣を５つ考えてください。 
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
                                { type: "text", text: prompt },
                                { type: "image_url", image_url: { url: img } } // 修正: `image_url` を正しく指定
                            ]
                        : prompt, // 修正: 画像なしの場合は `prompt` だけを送る
                    },
                ],
                max_tokens: 500,
                stream: false,
                temperature: 1.2,
            }),
        });

    } else {
        console.log("エラーが発生しました。type: なし");
    }
}
