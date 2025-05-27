import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { createClient } from '@/utils/supabase/server';

const prisma = new PrismaClient(); // インスタンス化

// 全タスクの取得API
export const GET = async (request: Request) => {
 try {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    console.log("ユーザー取得失敗もしくはログインできていません: ", error)
    return NextResponse.json(
      { error: "認証されていません" },
      { status: 401 }
    );
  } else {
    const alltodos = await prisma.todos.findMany({
      where: {userId: data.user.id}
    });
    console.log("todos: ",alltodos)
    return NextResponse.json({ message: 'success', alltodos }, { status: 200 });
  }
 } catch (err) {
    console.log("Todoの取得でエラーが発生しました", err)
  return NextResponse.json({ message: 'Error', err }, { status: 500 });
 }
};

// タスク追加用API
export const POST = async (req: Request) => {
 try {
  const jsondata = await req.json();
  const { title, description, continuedays, checkedDates, startdate, enddate, interval, purpose, tag, userId } = jsondata;
  const formattedStartDate = new Date(startdate.replace(/\//g, '-'));
  const formattedEndDate = new Date(enddate.replace(/\//g, '-'));

  const posttodo = await prisma.todos.create({
   data: {title,description,continuedays,checkedDates,startdate: formattedStartDate,enddate: formattedEndDate,interval,purpose,tag,userId},
  });
  return NextResponse.json({ message: 'success', posttodo }, { status: 201 });
 } catch (err) {
  return NextResponse.json({ message: 'Error', error: err }, { status: 500 });
 }
};
