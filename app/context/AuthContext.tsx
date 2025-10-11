"use client";

import {
    ReactNode,
    createContext,
} from "react";
import FullScreenLoading from "../components/common/fullScreenLoading";
import { AuthContextType } from "../Models/models";
import { useAuth } from "../hooks/auth/useAuth";

export const AuthContext = createContext<AuthContextType | null>(null);

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
