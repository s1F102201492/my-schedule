import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// タスク詳細用API
export const GET = async (req: Request) => {
 try {
  const id: number = parseInt(req.url.split('/todo/')[1]);
  const tododetail = await prisma.todos.findFirst({ where: { id } });

  return NextResponse.json({ message: 'success', tododetail }, { status: 200 });
 } catch (err) {
  return NextResponse.json({ message: 'Error', error: err }, { status: 500 });
 }
};

// タスク編集API
export const PUT = async (req: Request) => {
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
   purpose,
   tag,
   userId
  } = jsondata;
  const formattedStartDate = new Date(startdate.replace(/\//g, '-'));
  const formattedEndDate = new Date(enddate.replace(/\//g, '-'));

  const todoedit = await prisma.todos.update({
   data: {
    title,
    description,
    continuedays,
    checkedDates: checkedDates as object,
    startdate: formattedStartDate,
    enddate: formattedEndDate,
    interval,
    purpose,
    tag,
    userId
   },
   where: { id },
  });

  return NextResponse.json({ message: 'success', todoedit }, { status: 200 });
 } catch (err) {
    if (err instanceof Error){
        console.log("Error: ", err.stack)
    }
  return NextResponse.json({ message: 'Error', error: err }, { status: 500 });
 }
};

// タスク削除用API
export const DELETE = async (req: Request) => {
 try {
  const id: number = parseInt(req.url.split('/todo/')[1]);

  const tododelete = await prisma.todos.delete({
   where: { id },
  });

  return NextResponse.json({ message: 'success', tododelete }, { status: 200 });
 } catch (err) {
  return NextResponse.json({ message: 'Error', error: err }, { status: 500 });
 }
};
