import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// データベースに接続する
export async function main() {
    try {
        await prisma.$connect();
    } catch (err) {
        return Error("DB接続に失敗しました");
    }
}

// 全タスクの取得API
export const GET = async (req: Request, res: NextResponse) => {
    try {
        await main();
        const alltodos = await prisma.todos.findMany();
        return NextResponse.json({message:"success", alltodos }, {status: 200});
    } catch (err) {
        return NextResponse.json({message:"Error", err }, {status: 500})
    } finally {
        await prisma.$disconnect();
    }
}

// タスク追加用API
export const POST = async (req: Request, res: NextResponse) => {
    try {
        const jsondata = await req.json();
        const { id, title, description, continuedays, checkedDates, startdate, enddate, interval, color } = jsondata
        const formattedStartDate = new Date(startdate.replace(/\//g, '-'));
        const formattedEndDate = new Date(enddate.replace(/\//g, '-'));
        await main();

        const posttodo = await prisma.todos.create({data: { id, title, description, continuedays, checkedDates, startdate:formattedStartDate, enddate:formattedEndDate, interval, color }})
        return NextResponse.json({message:"success", posttodo }, {status: 201});
    } catch (err) {
        return NextResponse.json({message:"Error", error:err }, {status: 500})
    } finally {
        await prisma.$disconnect();
    }
}