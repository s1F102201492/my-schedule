"use client";

import {
    ReactNode,
    createContext,
} from "react";
import FullScreenLoading from "../components/parts/fullScreenLoading";
import { AuthContextType } from "../Models/models";
import { useAuth } from "../hooks/auth/useAuth";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { loginUser, loginSession, loading, session } = useAuth();

    return (
        <AuthContext.Provider
            value={{ loginUser, loginSession, session }}>
            {children}

            {loading && <FullScreenLoading open={loading} />}
        </AuthContext.Provider>
    );
};
