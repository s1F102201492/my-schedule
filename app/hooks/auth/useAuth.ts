// このカスタムフックでは、ユーザーの情報を取得するためのAPIを呼び出す
import { useCallback, useEffect, useState } from "react";
import { UserType } from "../../Models/models";
import { Session, User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

/**
 * ユーザーの認証状態を監視・管理するカスタムフック
 * Supabaseのセッション管理と、アプリ固有のDBからのユーザー情報取得を行います。
 * * @returns {object} 認証情報
 * @returns {UserType | null} loginUser - ログイン中のユーザー詳細情報（DBから取得したもの）
 * @returns {Session | null} session - Supabaseのセッション情報
 * @returns {boolean} loading - 認証情報の取得中かどうか
 * @returns {function} loginSession - セッション確認を手動で実行する関数
 */
export const useAuth = () => {
    const [loginUser, setLoginUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState<Session | null>(null);

    /**
     * アプリ内DB（usersテーブル）から特定のユーザー情報を取得する
     * @param {string} userId - 取得するユーザーのID
     */
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

    /**
     * 現在のログインセッションを確認し、状態を更新する
     * SupabaseのAuth機能を使用してセッションを取得後、対応するユーザー情報をDBから取り出します。
     */
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

    /**
     * 認証済みのSupabaseユーザー情報を使って、アプリ内DBから詳細を取得してセットする
     * @param {object} data - Supabaseのユーザーデータ
     */
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