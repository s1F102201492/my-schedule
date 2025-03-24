import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // インスタンス化

// 全タスクの取得API
export const GET = async () => {
 try {
  const alltodos = await prisma.todos.findMany();
  return NextResponse.json({ message: 'success', alltodos }, { status: 200 });
 } catch (err) {
    console.log(err)
  return NextResponse.json({ message: 'Error', err }, { status: 500 });
 }
};

// タスク追加用API
export const POST = async (req: Request) => {
 try {
  const jsondata = await req.json();
  const { title, description, continuedays, checkedDates, startdate, enddate, interval, purpose, tag } = jsondata;
  const formattedStartDate = new Date(startdate.replace(/\//g, '-'));
  const formattedEndDate = new Date(enddate.replace(/\//g, '-'));

  const posttodo = await prisma.todos.create({
   data: {title,description,continuedays,checkedDates,startdate: formattedStartDate,enddate: formattedEndDate,interval,purpose,tag},
  });
  return NextResponse.json({ message: 'success', posttodo }, { status: 201 });
 } catch (err) {
  return NextResponse.json({ message: 'Error', error: err }, { status: 500 });
 }
};
