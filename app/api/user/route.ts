import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { createClient } from '@/utils/supabase/client';

const prisma = new PrismaClient(); // インスタンス化

// 全タスクの取得API
export const GET = async () => {
    const supabase = createClient();

 try {
    // auth.userテーブルから取得
    const { data: authData , error: authError } = await supabase.auth.getUser();
            
    if (authError) {
        console.log(authError)
        return NextResponse.json({ message: 'Error', authError }, { status: 500 });
    } 
    const userId = authData!.user.id; // auth.users の ID
    const user = await prisma.users.findUnique({ where: {id: userId} });
    return NextResponse.json({ message: 'success', user }, { status: 200 });
 } catch (err) {
    console.log(err)
  return NextResponse.json({ message: 'Error', err }, { status: 500 });
 }
};

// タスク追加用API
export const POST = async (req: Request) => {
 try {
  const jsondata = await req.json();
  const { username, email } = jsondata;

  const posttodo = await prisma.users.create({
   data: { username, email},
  });
  return NextResponse.json({ message: 'success', posttodo }, { status: 201 });
 } catch (err) {
  return NextResponse.json({ message: 'Error', error: err }, { status: 500 });
 }
};
