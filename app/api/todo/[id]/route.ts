import { NextResponse } from 'next/server';
import { main } from '../route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// タスク詳細用API
export const GET = async (req: Request, res: NextResponse) => {
 try {
  const id: number = parseInt(req.url.split('/todo/')[1]);
  await main();
  const tododetail = await prisma.todos.findFirst({ where: { id } });

  return NextResponse.json({ message: 'success', tododetail }, { status: 200 });
 } catch (err) {
  return NextResponse.json({ message: 'Error', error: err }, { status: 500 });
 } finally {
  await prisma.$disconnect();
 }
};

// タスク編集API
export const PUT = async (req: Request, res: NextResponse) => {
 try {
  const id: number = parseInt(req.url.split('/todo/')[1]);

  const jsondata = await req.json();
  const {
   title,
   description,
   continuedays,
   checkedDates,
   startdate,
   enddate,
   interval,
   color,
  } = jsondata;
  const formattedStartDate = new Date(startdate.replace(/\//g, '-'));
  const formattedEndDate = new Date(enddate.replace(/\//g, '-'));

  await main();
  const todoedit = await prisma.todos.update({
   data: {
    title,
    description,
    continuedays,
    checkedDates: checkedDates as object,
    startdate: formattedStartDate,
    enddate: formattedEndDate,
    interval,
    color,
   },
   where: { id },
  });

  return NextResponse.json({ message: 'success', todoedit }, { status: 200 });
 } catch (err) {
  console.error('更新エラー:', err);
  return NextResponse.json({ message: 'Error', error: err }, { status: 500 });
 } finally {
  await prisma.$disconnect();
 }
};

// タスク削除用API
export const DELETE = async (req: Request, res: NextResponse) => {
 try {
  const id: number = parseInt(req.url.split('/todo/')[1]);

  await main();
  const tododelete = await prisma.todos.delete({
   where: { id },
  });

  return NextResponse.json({ message: 'success', tododelete }, { status: 200 });
 } catch (err) {
  return NextResponse.json({ message: 'Error', error: err }, { status: 500 });
 } finally {
  await prisma.$disconnect();
 }
};
