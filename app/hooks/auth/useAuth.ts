// このカスタムフックでは、ユーザーの情報を取得するためのAPIを呼び出す
import { useCallback, useEffect, useState } from "react";
import { UserType } from "../../Models/models";
import { Session, User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

export const useAuth = () => {
    const [loginUser, setLoginUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState<Session | null>(null);

    // usersテーブルからユーザーを取って来るAPI
    const fetchOneUser = useCallback(async (userId: string) => {
        try {
            const res = await fetch(`/api/user/${userId}`, {
                cache: "no-store",
            });
            const data = await res.json();
            return data.user;
        } catch {
            return null;
        }
    }, []);

    // ログイン状態を管理
    const loginSession = async () => {
        const supabase = createClient();

        setLoading(true);
        try {
            const { data: sessionData } =
                await supabase.auth.getSession();
            const getSession = sessionData?.session;

            if (!getSession) {
                setLoginUser(null);
                setSession(null);
                setLoading(false);
                return;
            }
            setSession(getSession);

            const { data: userData, error: userError } =
                await supabase.auth.getUser();

            if (userError) {
                setLoginUser(null);
                return;
            }

            if (!userData?.user) {
                setLoginUser(null);
                return;
            }

            await getLoginUser(userData);
        } catch {
            // エラーハンドリング
        } finally {
            setLoading(false);
        }
    };

    // ログインした場合ユーザー情報を取得
    const getLoginUser = async (data: { user: User }) => {
        const userId = data!.user.id; // auth.users の ID

        if (!userId) {
            setLoginUser(null);
        }

        const userInfo = await fetchOneUser(userId);

        if (userInfo) {
            setLoginUser(userInfo);
        } else {
            alert(
                "ユーザー情報が取得できませんでした。もう一度読み込んでください。",
            );
            setLoginUser(null);
        }
    };

    useEffect(() => {
        loginSession();
    }, []);

    return { loginUser, session, loading, loginSession };
}