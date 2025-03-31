'use client';

import { ReactNode, createContext, useState } from "react";

interface UserType {
    id: string;
    name: string;
    email: string;
    password: string;
}

interface AuthContextType {
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType| null>>;
}

export const AuthContext = createContext<AuthContextType| null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserType| null>(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};