"use client";

import React from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import { signOut } from "@/utils/supabase/authGoogle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { UserCardProps } from "../../Models/models";

const UserCard: React.FC<UserCardProps> = ({ loginUser }) => {
    // Googleログアウト
    const router = useRouter();
    const handleGoogleLogout = async () => {
        const result = await signOut();
        if (result) router.refresh();
    };

    return (
        <div>
            <Card
                sx={{
                    width: 280,
                    margin: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                }}>
                <CardContent sx={{ textAlign: "center", padding: 3 }}>
                    {/* ユーザーアイコン */}
                    <Box sx={{ mb: 2 }}>
                        {loginUser?.avatar_url ? (
                            <Avatar
                                src={loginUser.avatar_url}
                                alt={loginUser.username || "User"}
                                sx={{
                                    width: 80,
                                    height: 80,
                                    margin: "0 auto",
                                    bgcolor: "primary.main",
                                    fontSize: "2rem",
                                }}
                            />
                        ) : (
                            <AccountCircleIcon sx={{ fontSize: "2.5rem" }} />
                        )}
                    </Box>

                    {loginUser ? (<>
                        {/* ユーザー名 */}
                        <Typography
                            variant='h6'
                            component='h2'
                            sx={{
                                fontWeight: "bold",
                                mb: 0.5,
                                color: "text.primary",
                            }}>
                            {loginUser?.username}
                        </Typography>

                        {/* メールアドレス */}
                        <Typography
                            variant='body2'
                            color='text.secondary'
                            sx={{
                                mb: 2,
                                wordBreak: "break-word",
                            }}>
                            {loginUser.email}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        {/* アクションボタン */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                            }}>
                            <Button
                                variant='contained'
                                startIcon={<LogoutIcon />}
                                onClick={handleGoogleLogout}
                                fullWidth
                                color='error'
                                sx={{
                                    borderRadius: 2,
                                    textTransform: "none",
                                }}>
                                ログアウト
                            </Button>
                        </Box>
                    </>
                    ): "ログインされていません"}
                        
                </CardContent>
            </Card>
        </div>
    );
};

export default UserCard;
