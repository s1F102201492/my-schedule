import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { createClient } from "@/utils/supabase/server";

// 全タスクの取得API
export const GET = async () => {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase.auth.getUser();

        if (error || !data?.user) {
            return NextResponse.json(
                { error: "認証されていません" },
                { status: 401 },
            );
        }

        const alltodos = await prisma.todos.findMany({
            where: { userId: data.user.id },
        });
        
        return NextResponse.json(
            { message: "success", alltodos },
            { status: 200 },
        );
    } catch {
        return NextResponse.json(
            { message: "エラーが発生しました" },
            { status: 500 }
        );
    }
};

// タスク追加用API
export const POST = async (req: Request) => {
    try {
        // 認証チェック
        const supabase = await createClient();
        const { data, error } = await supabase.auth.getUser();

        if (error || !data?.user) {
            return NextResponse.json(
                { error: "認証されていません" },
                { status: 401 },
            );
        }

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
        } = jsondata;
        const formattedStartDate = new Date(startdate.replace(/\//g, "-"));
        const formattedEndDate = new Date(enddate.replace(/\//g, "-"));

        const posttodo = await prisma.todos.create({
            data: {
                title,
                description,
                continuedays,
                checkedDates,
                startdate: formattedStartDate,
                enddate: formattedEndDate,
                interval,
                purpose,
                tag,
                userId: data.user.id, // 認証されたユーザーIDを使用
            },
        });
        
        return NextResponse.json(
            { message: "success", posttodo },
            { status: 201 },
        );
    } catch {
        return NextResponse.json(
            { message: "エラーが発生しました" },
            { status: 500 },
        );
    }
};
