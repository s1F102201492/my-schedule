import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { createClient } from "@/utils/supabase/server";

// ユーザーの取得API
export const GET = async () => {
    try {
        const supabase = await createClient();

        // auth.userテーブルから取得
        const { data: authData, error: authError } =
            await supabase.auth.getUser();

        if (authError || !authData?.user) {
            return NextResponse.json(
                { error: "認証されていません" },
                { status: 401 },
            );
        }

        const userId = authData.user.id; // auth.users の ID
        const user = await prisma.users.findUnique({ where: { id: userId } });

        if (!user) {
            return NextResponse.json(
                { error: "ユーザーが見つかりません" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "success", user }, { status: 200 });
    } catch {
        return NextResponse.json(
            { message: "エラーが発生しました" },
            { status: 500 }
        );
    }
};
