'use client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material';
import theme from '../components/theme/theme';

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>   
    );
}
