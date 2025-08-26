'use client';

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import type { Session } from '@supabase/supabase-js'
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import FullScreenLoading from "../components/parts/fullScreenLoading";

interface UserType {
    id: string;
    username: string;
    email: string;
    avatar_url: string;
}

interface AuthContextType {
    loginUser: UserType | null;
    setLoginUser: React.Dispatch<React.SetStateAction<UserType| null>>;
    loginSession: () => Promise<void>;
    session: Session | null;
}

export const AuthContext = createContext<AuthContextType| null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [loginUser, setLoginUser] = useState<UserType| null>(null);
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState<Session | null>(null);

    // usersテーブルからユーザーを取って来るAPI
    const fetchOneUser = useCallback(async (userId: string) => {
        try {
            const res = await fetch(`/api/user/${userId}`, { cache: 'no-store' });
            const data = await res.json();
            return data.user;
        } catch (error) {
            console.error('ユーザーテーブルからの取得に失敗しました:', error);
            return null;
        }
    }, [])

    // ログイン状態を管理
    const loginSession = async () => {
        const supabase = createClient();

        setLoading(true);
        try {
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
            const getSession = sessionData?.session;
    
            if (!getSession) {
                console.log("No active session found.:", sessionError);
                setLoginUser(null);
                return;
            }
            setSession(getSession);
    
            const { data: userData, error: userError } = await supabase.auth.getUser();
    
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
            setLoading(false)
            
        }
    };
    
    // ログインした場合ユーザー情報を取得
    const getLoginUser = async (data: { user: User; }) => {

        const userId = data!.user.id; // auth.users の ID
        console.log(userId)

        if (!userId) {
            console.log("userIdの取得に失敗しました")
            setLoginUser(null);
        } 

        const userInfo = await fetchOneUser(userId);
        console.log(userInfo)

        if (userInfo) {
            setLoginUser(userInfo);
        } else {
            alert("ユーザー情報が取得できませんでした。もう一度読み込んでください。")
            setLoginUser(null);
        }
    }

    useEffect(() => {
        loginSession();
    },[])    
    
    return (
        <AuthContext.Provider value={{ loginUser, setLoginUser, loginSession, session }}>
            {children}

            {loading && <FullScreenLoading open={loading} />}
        </AuthContext.Provider>
    );
};