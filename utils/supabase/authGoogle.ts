"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// ---------------------------------------------
// Googleログイン
// ---------------------------------------------
export async function signInWithGoogle() {
    // クライアントを作成
    const supabase = await createClient();
    const {
        data: { url },
        error,
    } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${process.env.SUPABASE_AUTH_URL}`,
            queryParams: {
                access_type: "offline",
                prompt: "consent",
            },
        },
    });
    if (error) console.error("Googleログインエラー:", error.message);
    if (!error && url) redirect(url);
}

// ---------------------------------------------
// Googleログアウト
// ---------------------------------------------
export async function signOut() {
    // クライアントを作成
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Googleログアウトエラー:", error.message);
    if (!error) {
        redirect("/userauth");
    }
    return false;
}
