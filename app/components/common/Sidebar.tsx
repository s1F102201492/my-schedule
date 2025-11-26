"use client";

import React from "react";
import Drawer from "@mui/material/Drawer";
import UserCard from "../../components/common/UserCard";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import EventIcon from "@mui/icons-material/Event";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import EqualizerOutlinedIcon from "@mui/icons-material/EqualizerOutlined";
import ArticleIcon from '@mui/icons-material/Article';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { usePathname } from 'next/navigation';
import { useRouter } from "next/navigation";
import { SidebarProps } from "../../Models/models";

/**
 * 画面右側からスライドインするサイドバー（ドロワー）コンポーネント
 * * 主な機能:
 * - ユーザー情報のカード表示
 * - モバイル画面時: 主要ページへのナビゲーションリンクを表示
 * - PC画面時: お問い合わせやガイドなどの補助メニューを表示
 * * @component
 * @param {SidebarProps} props - ドロワーの開閉状態、制御関数、ログインユーザー情報
 */
export default function Sidebar({
    drawer,
    setDrawer,
    loginUser,
}: SidebarProps) {

    const mobileMenuItems = [
        { text: "Home", icon: <HomeIcon />, href: "/" },
        { text: "タスク追加", icon: <AddBoxOutlinedIcon />, href: "/addTask" },
        { text: "カレンダー", icon: <EventIcon />, href: "/calendar" },
        { text: "タスク一覧", icon: <FormatListNumberedIcon />, href: "/list" },
        { text: "AI Analytics", icon: <EqualizerOutlinedIcon />, href: "/analytics" },
    ]

    const router = useRouter();
    const pathname = usePathname();

    const handlePageLink = (href: string) => {
        router.push(href);
        router.refresh();
        setDrawer(false);
    };

    return (
        <Drawer
        open={drawer}
        onClose={() => setDrawer(false)}
        anchor="right">
            {/* ユーザー情報表示部分 */}
            <UserCard loginUser={loginUser} />

            {/* モバイル用メニュー（画面幅が狭いときのみ表示） */}
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <List>
                    {mobileMenuItems.map((item) => {
                        const isPath = pathname === item.href;

                        return (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton
                                onClick={() => handlePageLink(item.href)}
                                sx={{
                                    "&:hover": {
                                    backgroundColor: "action.hover",
                                    }
                                }}
                                disabled={isPath} // 現在のページのリンクは無効化
                                >
                                <ListItemIcon sx={{ color: "primary.main" }}>{item.icon}</ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                />
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </List>
            </Box>

            {/* PC用メニュー（画面幅が広いときのみ表示） */}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <List>
                    <ListItem key="contact">
                        <ListItemButton
                            href="https://docs.google.com/forms/d/e/1FAIpQLSfZqnEIjM4MZkNY5Nm8UszqVFhNqJrUmWBANIlu3WxAvRma6g/viewform?usp=dialog"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                "&:hover": {
                                backgroundColor: "action.hover",
                                }
                            }}
                            >
                            <ListItemIcon sx={{ color: "primary.main" }}><ArticleIcon /></ListItemIcon>
                            <ListItemText
                                primary="お問い合わせ"
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key="guide">
                        <ListItemButton
                            href="/guide.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                "&:hover": {
                                backgroundColor: "action.hover",
                                }
                            }}
                            >
                            <ListItemIcon sx={{ color: "primary.main" }}><HelpOutlineIcon /></ListItemIcon>
                            <ListItemText
                                primary="使い方ガイド"
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
}
