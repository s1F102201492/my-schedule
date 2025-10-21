"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

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
