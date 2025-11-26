"use client";

import {
    ReactNode,
    createContext,
} from "react";
import FullScreenLoading from "../components/common/fullScreenLoading";
import { AuthContextType } from "../Models/models";
import { useAuth } from "../hooks/auth/useAuth";

/**
 * 認証状態をアプリケーション全体で共有するためのContextオブジェクト
 */
export const AuthContext = createContext<AuthContextType | null>(null);

/**
 * 認証コンテキストプロバイダー
 * `useAuth`フックの結果をコンテキストとして提供し、ログイン状態やユーザー情報を子コンポーネントに配信します。
 * セッションチェックが完了するまではローディング画面を表示します。
 * * @component
 * @param {ReactNode} children - 子コンポーネント
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { loginUser, loginSession, loading, session } = useAuth();

    if (!session) {
        return <FullScreenLoading open={loading} />;
    }

    return (
        <AuthContext.Provider
            value={{ loginUser, loginSession, session }}>
            {children}
        </AuthContext.Provider>
    );
};
