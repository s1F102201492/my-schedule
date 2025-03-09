import { NextResponse } from 'next/server';

export async function POST(req: Request) {
 try {
  const { prompt } = await req.json();

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
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 500,
    stream: true,
    temperature: 1.0,
   }),
  });

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

  // ストリームの処理
  const reader = response.body?.getReader();
  console.log(response.body);
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

  return new Response(stream);
 } catch (error) {
  console.error('サーバーエラー:', error);
  return NextResponse.json(
   { error: 'responseの取得に失敗しました。' },
   { status: 500 },
  );
 }
}
