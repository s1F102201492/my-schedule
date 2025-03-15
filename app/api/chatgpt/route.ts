import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { prompt, img } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    const apiEndPoint = process.env.OPENAI_API_URL;

    if (!apiKey) {
        console.error('API keyがありません。');
        return NextResponse.json(
            { error: 'API keyがありません。' },
            { status: 500 },
        );
    }

    if (!apiEndPoint) {
        console.error('API URLがありません。');
        return NextResponse.json(
            { error: 'API URLがありません。' },
            { status: 500 },
        );
    }

    const response = await fetch(`${apiEndPoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
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
}
