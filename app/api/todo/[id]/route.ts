import { NextResponse } from "next/server";
import { main } from "../route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// タスク詳細用API
export const GET = async (req: Request, res: NextResponse) => {
    try {
        const id:number = parseInt(req.url.split("/todo/")[1]);
        await main();
        const tododetail = await prisma.todos.findFirst({ where: { id }});

        return NextResponse.json({message:"success", tododetail }, {status: 200});
    } catch (err) {
        return NextResponse.json({message:"Error", error:err }, {status: 500})
    } finally {
        await prisma.$disconnect();
    }
}