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
        } catch (error) {
            console.error("ユーザーテーブルからの取得に失敗しました:", error);
            return null;
        }
    }, []);

    // ログイン状態を管理
    const loginSession = async () => {
        const supabase = createClient();

        setLoading(true);
        try {
            const { data: sessionData, error: sessionError } =
                await supabase.auth.getSession();
            const getSession = sessionData?.session;

            if (!getSession) {
                console.log("No active session found.:", sessionError);
                setLoginUser(null);
                return;
            }
            setSession(getSession);

            const { data: userData, error: userError } =
                await supabase.auth.getUser();

            if (userError) {
                console.error("getUser error:", userError);
                setLoginUser(null);
                return;
            }

            if (!userData?.user) {
                console.log("No user found.");
                setLoginUser(null);
                return;
            }

            await getLoginUser(userData);
        } catch (error) {
            console.error("loginSession error:", error);
        } finally {
            setLoading(false);
        }
    };

    // ログインした場合ユーザー情報を取得
    const getLoginUser = async (data: { user: User }) => {
        const userId = data!.user.id; // auth.users の ID
        console.log(userId);

        if (!userId) {
            console.log("userIdの取得に失敗しました");
            setLoginUser(null);
        }

        const userInfo = await fetchOneUser(userId);
        console.log(userInfo);

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