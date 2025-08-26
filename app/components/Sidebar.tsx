"use client";

import React from "react";
import Drawer from "@mui/material/Drawer";
import UserCard from "../components/parts/UserCard";

interface SidebarProps {
    drawer: boolean;
    setDrawer: React.Dispatch<React.SetStateAction<boolean>>;
    loginUser: UserCardProps;
}

interface UserCardProps {
    id: string;
    username: string;
    email: string;
    avatar_url: string;
}

export default function Sidebar({
    drawer,
    setDrawer,
    loginUser,
}: SidebarProps) {
    return (
        <Drawer
            open={drawer}
            anchor='right'
            onClose={() => setDrawer(false)}>
            <UserCard loginUser={loginUser!} />
        </Drawer>
    );
}
