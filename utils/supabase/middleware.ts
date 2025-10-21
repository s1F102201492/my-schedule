// utils/supabase/middleware.ts を修正
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
        return NextResponse.next({ request });
    }

    let response = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    response = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        },
    );

    let user = null;
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            user = session.user;
        }
    } catch (error) {
        console.error("Supabase接続エラー:", error);
    }

    const pathname = request.nextUrl.pathname;

    // 認証が必要なページへの未認証アクセス
    if (!user && !pathname.startsWith("/userauth") && !pathname.startsWith("/auth")) {
        const url = request.nextUrl.clone();
        url.pathname = "/userauth";
        return NextResponse.redirect(url);
    }
    
    // 認証済みユーザーがログインページにアクセス
    // 注意: このリダイレクトはresponseではなく、通常のリクエストとして処理させる
    if (user && pathname === "/userauth") {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    return response;
}