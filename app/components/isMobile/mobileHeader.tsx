"use client";

import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from "@mui/icons-material/Home";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import EventIcon from "@mui/icons-material/Event";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import Link from "next/link";
import { usePathname } from "next/navigation";
import EqualizerOutlinedIcon from "@mui/icons-material/EqualizerOutlined";
import { Button, IconButton, Menu } from "@mui/material";
import Sidebar from "../Sidebar";
import { AuthContext } from "../../context/AuthContext";

const MobileHeader = () => {
    const pathname = usePathname();

    const [hambergerMenu, setHambergerMenu] = useState<boolean>(false);
    const handleHambergerMenu = () => {
        setHambergerMenu(true);
    };

    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error(
            "TodoContext is undefined. Make sure to use TodoProvider.",
        );
    }

    const { loginUser } = authContext;

    return (
        <Box>
            <AppBar
                position='static'
                sx={{ backgroundColor: "primary" }}>
                <Toolbar>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Typography
                            variant='h6'
                            component='div'
                            sx={{ 
                                pt: 1,
                                flexGrow: 1,
                                whiteSpace: "nowrap",
                                overflow: "visible",
                                textOverflow: "clip",
                                alignItems: "center" }}
                            noWrap>
                            Best practice
                        </Typography>

                        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={handleHambergerMenu}
                            >
                                <MenuIcon color="inherit"/>
                            </IconButton>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            {hambergerMenu && <Sidebar drawer={hambergerMenu} setDrawer={setHambergerMenu} loginUser={loginUser || undefined} />}
        </Box>
    );
};

export default MobileHeader;
