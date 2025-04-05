'use client';

import { createClient } from "@/utils/supabase/client";
import { UserResponse } from "@supabase/supabase-js";
import { ReactNode, createContext, useEffect, useState } from "react";

interface UserType {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    loginUser: UserType | null;
    setLoginUser: React.Dispatch<React.SetStateAction<UserType| null>>;
}

export const AuthContext = createContext<AuthContextType| null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const supabase = createClient();

    const [loginUser, setLoginUser] = useState<UserType| null>(null);
    const [loading, setLoading] = useState(true);
    const [avatar_url, setAvatarUrl] = useState<string | null>(null);

    // ログイン状態を管理
    const loginSession = async () => {
        const user = await supabase.auth.getUser();

        if (user) {
            await getLoginUser(user);
        }
    }

    // ログインした場合ユーザー情報を取得
    const getLoginUser = async (user: UserResponse) => {
        try {
            // auth.userテーブルから取得
            const { data: authData , error: authError } = user
            
            if (authError) {
                console.log("AuthError:",authError)
                return;
            } 

            const userId = authData!.user.id; // auth.users の ID
            // public.Users テーブルから username を取得
            const { data: profileData, error: profileError } = await supabase
                .from('Users')
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
                email: authData.user.email!,
            }
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
        <AuthContext.Provider value={{ loginUser, setLoginUser }}>
            {children}
        </AuthContext.Provider>
    );
};