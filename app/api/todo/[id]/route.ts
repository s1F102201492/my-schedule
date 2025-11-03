import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { createClient } from "@/utils/supabase/server";

// タスク詳細用API
export const GET = async (req: Request) => {
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

        const id: number = parseInt(req.url.split("/todo/")[1]);
        
        // ユーザー所有権チェック
        const tododetail = await prisma.todos.findFirst({ 
            where: { 
                id,
                userId: data.user.id // 自分のタスクのみ取得
            } 
        });

        if (!tododetail) {
            return NextResponse.json(
                { error: "タスクが見つかりません" },
                { status: 404 },
            );
        }

        return NextResponse.json(
            { message: "success", tododetail },
            { status: 200 },
        );
    } catch {
        return NextResponse.json(
            { message: "エラーが発生しました" },
            { status: 500 },
        );
    }
};

// タスク編集API
export const PUT = async (req: Request) => {
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

        const id: number = parseInt(req.url.split("/todo/")[1]);

        // ユーザー所有権チェック
        const existingTodo = await prisma.todos.findFirst({
            where: {
                id,
                userId: data.user.id
            }
        });

        if (!existingTodo) {
            return NextResponse.json(
                { error: "タスクが見つかりません" },
                { status: 404 },
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
                userId: data.user.id, // 認証されたユーザーIDを使用
            },
            where: { id },
        });

        return NextResponse.json(
            { message: "success", todoedit },
            { status: 200 },
        );
    } catch (err) {
        console.error('API Error (PUT /api/todo/[id]):', err);
        return NextResponse.json(
            { message: "エラーが発生しました" },
            { status: 500 },
        );
    }
};

// タスク削除用API
export const DELETE = async (req: Request) => {
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

        const id: number = parseInt(req.url.split("/todo/")[1]);

        // ユーザー所有権チェック
        const existingTodo = await prisma.todos.findFirst({
            where: {
                id,
                userId: data.user.id
            }
        });

        if (!existingTodo) {
            return NextResponse.json(
                { error: "タスクが見つかりません" },
                { status: 404 },
            );
        }

        const tododelete = await prisma.todos.delete({
            where: { id },
        });

        return NextResponse.json(
            { message: "success", tododelete },
            { status: 200 },
        );
    } catch (err) {
        console.error('API Error (DELETE /api/todo/[id]):', err);
        return NextResponse.json(
            { message: "エラーが発生しました" },
            { status: 500 },
        );
    }
};
