import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// タグ取得用API
export const GET = async (req: Request, res: NextResponse) => {
 try {
  const id: number = parseInt(req.url.split('/tags/')[1]);
  const tag = await prisma.tags.findFirst({ where: { id }, include: { todos: true } });

  return NextResponse.json({ message: 'success', tag }, { status: 200 });
 } catch (err) {
  return NextResponse.json({ message: 'Error', error: err }, { status: 500 });
 }
};

// タグ削除用API
export const DELETE = async (req: Request) => {
 try {
  const id: number = parseInt(req.url.split('/tags/')[1]);

  const tagdelete = await prisma.tags.delete({
   where: { id }
  });

  return NextResponse.json({ message: 'success', tagdelete }, { status: 200 });
 } catch (err) {
  return NextResponse.json({ message: 'Error', error: err }, { status: 500 });
 }
};
