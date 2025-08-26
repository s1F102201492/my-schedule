import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 実績データの取得API
export const GET = async (req: Request) => {
    try {
        const uid: string = req.url.split("/achievements/")[1];
        const achievement = await prisma.achievements.findFirst({
            where: { userId: uid },
        });

        return NextResponse.json(
            { message: "success", achievement: achievement },
            { status: 200 },
        );
    } catch (err) {
        return NextResponse.json(
            { message: "Error", error: err },
            { status: 500 },
        );
    }
};

// 実績データの編集API
export const PATCH = async (req: Request) => {
    try {
        const uid: string = req.url.split("/achievements/")[1];

        const jsondata = await req.json();
        console.log(jsondata);
        const { achieve_day, achieve_taskCount, achieve_multi } = jsondata;
        console.log("abi:", achieve_day);

        const achieveEdit = await prisma.achievements.update({
            data: { achieve_day, achieve_taskCount, achieve_multi },
            where: { userId: uid },
        });

        return NextResponse.json(
            { message: "success", achieveEdit: achieveEdit },
            { status: 200 },
        );
    } catch (err) {
        if (err instanceof Error) {
            console.log("Error: ", err.stack);
        }
        return NextResponse.json(
            { message: "Error", error: err },
            { status: 500 },
        );
    }
};
