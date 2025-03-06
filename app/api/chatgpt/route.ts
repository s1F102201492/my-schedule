import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { prompt } = await request.json();
  
  const apiKey = process.env.OPENAI_API_KEY;
  const apiEndPoint = process.env.OPENAI_API_URL
  
  if (!apiKey) {
    return NextResponse.json(
      { error: "API keyがありません。" },
      { status: 500 }
    );
  }
  
  // INIAD_APIエンドポイント: https://api.openai.iniad.org/api/v1/chat/completions
  try {
    const response = await fetch(`${apiEndPoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
        stream: true, // ストリームを有効にする
      }),
    });
    
    const reader = response.body?.getReader();
    const stream = new ReadableStream({
      async pull(controller) {
        const { done, value } = await reader!.read();
        if (done) {
          controller.close();
          return;
        }
        controller.enqueue(value);
      },
    });
    
    const streamResponse = new Response(stream);
    return streamResponse;
    } catch (error) {
    return NextResponse.json(
      { error: "responseの取得に失敗しました。" },
      { status: 500 }
    );
  }
}



