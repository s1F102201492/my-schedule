"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Box, ThemeProvider } from "@mui/material";
import theme from "../components/theme/theme";
import { AuthProvider } from "../context/AuthContext";
import { TodoProvider } from "../context/TodoContext";
import PCHeader from "../components/isPC/PCHeader";
import MobileHeader from "../components/isMobile/mobileHeader";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthProvider>
            <TodoProvider>
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        {/* PC用ヘッダー */}
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <PCHeader />
                        </Box>

                        {/* モバイル用ヘッダー */}
                        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                            <MobileHeader />
                        </Box>
                        
                        <Box sx={{ mt: { xs: 10, sm: 3 } }}>
                            {children}
                        </Box>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </TodoProvider>
        </AuthProvider>
    );
}
