"use client";

import React from "react";
import Drawer from "@mui/material/Drawer";
import UserCard from "../components/parts/UserCard";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import EventIcon from "@mui/icons-material/Event";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import EqualizerOutlinedIcon from "@mui/icons-material/EqualizerOutlined";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useRouter } from "next/navigation";

interface SidebarProps {
    drawer: boolean;
    setDrawer: React.Dispatch<React.SetStateAction<boolean>>;
    loginUser?: UserType | null;
}

interface UserType {
    id: string;
    username: string;
    email: string;
    avatar_url: string;
}

// モバイル時のハンバーガーメニューで表示されるサイドバー

export default function Sidebar({
    drawer,
    setDrawer,
    loginUser,
}: SidebarProps) {

    const menuItems = [
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
            <UserCard loginUser={loginUser} />
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <List>
                    {menuItems.map((item) => {
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
        </Drawer>
    );
}
