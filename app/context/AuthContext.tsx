'use client';

import { createClient } from "@/utils/supabase/client";
import { User, UserResponse } from "@supabase/supabase-js";
import { ReactNode, createContext, useEffect, useState } from "react";

interface UserType {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    loginUser: UserType | null;
    setLoginUser: React.Dispatch<React.SetStateAction<UserType| null>>;
    loginSession: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType| null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const supabase = createClient();

    const [loginUser, setLoginUser] = useState<UserType| null>(null);
    const [loading, setLoading] = useState(true);
    const [avatar_url, setAvatarUrl] = useState<string | null>(null);

    // ログイン状態を管理
    const loginSession = async () => {
        setLoading(true);
        try {
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
            const session = sessionData?.session;
            console.log("Session:", session);
    
            if (!session) {
                console.log("No active session found.:", sessionError);
                setLoginUser(null);
                return;
            }
    
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
            setLoading(false);
        }
    };
    

    // ログインした場合ユーザー情報を取得
    const getLoginUser = async (data: { user: User; }) => {
        try {
            
            const userId = data!.user.id; // auth.users の ID
            // public.Users テーブルから username を取得
            const { data: profileData, error: profileError } = await supabase
                .from('users')
                .select('username')
                .eq('id', userId)
                .single(); // 1人のユーザー情報だけ取得

            if (profileError) {
                console.error("Profile fetch error:", profileError);
            } else {
                console.log("Username:", profileData.username);
            }
            
            const userInfo:UserType = {
                id: userId,
                name: profileData!.username,
                email: data.user.email!,
            }
            console.log(userInfo)
            setLoginUser(userInfo)

        } catch (error) {
            console.log(error);
            alert('Error loading user data!');
        }
    }

    useEffect(() => {
        loginSession();
    },[])
    
    return (
        <AuthContext.Provider value={{ loginUser, setLoginUser, loginSession }}>
            {children}
        </AuthContext.Provider>
    );
};