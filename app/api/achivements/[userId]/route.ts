import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 実績データの取得API
export const GET = async (req: Request, res: NextResponse) => {
 try {
  const uid: string = req.url.split('/achivements/')[1];
  const achivement = await prisma.achivements.findFirst({ where: { userId: uid } });

  return NextResponse.json({ message: 'success', achivement }, { status: 200 });
 } catch (err) {
  return NextResponse.json({ message: 'Error', error: err }, { status: 500 });
 }
};

// 実績データの編集API
export const PUT = async (req: Request, res: NextResponse) => {
 try {
  const uid: string = req.url.split('/ahivements/')[1];

  const jsondata = await req.json();
  const { achive_day, achive_taskCount, achive_multi, userId } = jsondata;
  
  const achiveEdit = await prisma.achivements.update({
    data: { achive_day, achive_taskCount, achive_multi, userId },
    where: { userId: uid }
  })

  return NextResponse.json({ message: 'success', achiveEdit }, { status: 200 });
 } catch (err) {
    if (err instanceof Error){
        console.log("Error: ", err.stack)
    }
  return NextResponse.json({ message: 'Error', error: err }, { status: 500 });
 }
};

