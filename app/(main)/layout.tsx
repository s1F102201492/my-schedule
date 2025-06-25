'use client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material';
import theme from '../components/theme/theme';
import { AuthProvider } from '../context/AuthContext';
import { TodoProvider } from '../context/TodoContext';
import { AchieveProvider } from '../context/AchieveContext';

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthProvider>
            <TodoProvider>
                <AchieveProvider>
                    <AppRouterCacheProvider>
                        <ThemeProvider theme={theme}>{children}</ThemeProvider>
                    </AppRouterCacheProvider>
                </AchieveProvider>
            </TodoProvider>
        </AuthProvider>
           
    );
}
