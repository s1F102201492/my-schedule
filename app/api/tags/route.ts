import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // インスタンス化

// タグの取得API
export const GET = async () => {
 try {
  const alltags = await prisma.tags.findMany({
    include: { todos: true }
  });
  return NextResponse.json({ message: 'success', alltags }, { status: 200 });
 } catch (err) {
  return NextResponse.json({ message: 'Error', err }, { status: 500 });
 }
};

// タグ追加用API
export const POST = async (req: Request) => {
 try {
  const jsondata = await req.json();
  const { name } = jsondata;

  const addtag = await prisma.tags.create({
   data: { name },
  });
  return NextResponse.json({ message: 'success', addtag }, { status: 201 });
 } catch (err) {
  return NextResponse.json({ message: 'Error', error: err }, { status: 500 });
 }
};
