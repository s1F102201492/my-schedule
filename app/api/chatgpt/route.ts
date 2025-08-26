import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ja");
dayjs.tz.setDefault("Asia/Tokyo");

export async function POST(req: Request) {
    const today = dayjs();
    const formattedToday = today.format("YYYY/MM/DD");

    const { type, prompt, img, tag, level } = await req.json();

    const prisma = new PrismaClient(); // インスタンス化

    let alltodos = [];

    try {
        // ユーザーのタスクを取得
        alltodos = await prisma.todos.findMany();
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }

    const gptApiKey = process.env.OPENAI_API_KEY;
    const gptApiEndPoint = process.env.OPENAI_API_URL;

    if (!gptApiKey) {
        console.error("API keyがありません。");
        return NextResponse.json(
            { error: "API keyがありません。" },
            { status: 500 },
        );
    }

    if (!gptApiEndPoint) {
        console.error("API URLがありません。");
        return NextResponse.json(
            { error: "API URLがありません。" },
            { status: 500 },
        );
    }

    let SystemPrompt: string = ``;

    if (type === "recommend") {
        // AIrecommnedページに返答
        // プロンプト設定
        SystemPrompt = `アプリの利用者が自分の目標、(あれば)目標の画像、タスクのタグ（カテゴリ）、タスクの難易度を入力するので、あなたはその内容を分析し利用者がなりたい姿やなりたいもの、目標を達成できるような習慣を５つ考えてください。
        難易度に関しては、そのタスクを毎日やるのか、それとも3日ごとにやるのかといった、あるタスクに対して行う頻度という意味での難易度になります。
        開始日は明日からにして、終了日はタスクの難易度${level}が'低い'ならば開始日から14日後、'まあまあ'ならば開始日から30日後、'高い'ならば開始日から60日後に設定してください。今日の日付: ${formattedToday}
        また、利用者の登録しているタスクとできるだけ被らないようにしてください。利用者のタスクはjson形式です。目標: ${prompt}, 画像: ${img}, タスクのタグ${tag}, タスクの難易度${level} 利用者のタスク: ${alltodos}
        返す値はタスク１つ１つはオブジェクト形式でそれを配列の中に入れて配列として返してください。
        それ以外のものは返す値に含めないでください。最初にjsonと書くのもやめてください。改行は入れないでください。
        オブジェクトの型{
            title（タスク名）, 
            description（タスクの内容）,
            startdate（開始日）,
            enddate（終了日）,
            interval（間隔（例えば3日ごとの場合は3）を数値のみで返す）,
            tag（タグ（これは${tag}をそのまま返す））}
            以上の条件、指定したことは絶対に守ってください。`;

        const response = await fetch(`${gptApiEndPoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${gptApiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "user",
                        content: img
                            ? [
                                  { type: "text", text: SystemPrompt },
                                  {
                                      type: "image_url",
                                      image_url: { url: img },
                                  }, // 修正: `image_url` を正しく指定
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
            console.error("エラーメッセージ:", errorData);

            return NextResponse.json(
                { error: "APIリクエストが失敗しました。" },
                { status: response.status },
            );
        }

        // JSONデータをそのまま返す
        return NextResponse.json({ result: data.choices[0]?.message?.content });
    } else if (type === "model") {
        // modelページに返答
        console.log(tag);
        if (tag === "絞らない") {
            SystemPrompt = `あなたは、ユーザーのタスクデータをもとに、ユーザーが目指している「理想の自分」をイメージする役割です。
        ユーザーが行っている習慣の一覧:${JSON.stringify(alltodos)}
        主にtitle(タスク名),description(タスクの詳細や現状の記録),purpose(そのタスクを行う目的)から考えてください。
        これらの情報から、ユーザーのなりたい理想の姿を400文字以内で表現してください。
        理想の姿については、少し話を盛ってもかまいませんが、具体的に書いてください。（ユーザーがイメージしやすいように）`;
        } else {
            SystemPrompt = `あなたは、ユーザーのタスクデータをもとに、ユーザーが目指している「理想の自分」をイメージする役割です。
        ユーザーが行っている習慣の一覧:${JSON.stringify(alltodos.filter((todo) => todo.tag === tag))}
        主にtitle(タスク名),description(タスクの詳細や現状の記録),purpose(そのタスクを行う目的)から考えてください。
        これらの情報から、ユーザーのなりたい理想の姿を400文字以内で表現してください。
        理想の姿については、少し話を盛ってもかまいませんが、具体的に書いてください。（ユーザーがイメージしやすいように）
        ユーザーが指定したタグのタスクが存在しない場合、「そのタグのタスクは存在しないので、もう一度タグを選びなおしてください。」という
        メッセージを出力してください。 ユーザーが指定したタグ: ${tag}`;
        }

        const response = await fetch(`${gptApiEndPoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${gptApiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "user",
                        content: SystemPrompt,
                    },
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
            headers: { "Content-Type": "text/event-stream" },
        });
    } else {
        console.log("エラーが発生しました。type: なし");
    }
}
