"use client";

import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from '@mui/icons-material/Menu';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { IconButton, Tooltip } from "@mui/material";
import Sidebar from "../Sidebar";
import ArticleIcon from '@mui/icons-material/Article';
import { AuthContext } from "../../context/AuthContext";

const MobileHeader = () => {

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
                position='fixed'
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
                                alignItems: "center",
                                color: "white" }}
                            noWrap>
                            Best practice
                        </Typography>

                        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Tooltip title="お問い合わせフォーム">
                                <IconButton
                                    size="large"
                                    edge="start"
                                    aria-label="inquiry"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://docs.google.com/forms/d/e/1FAIpQLSfZqnEIjM4MZkNY5Nm8UszqVFhNqJrUmWBANIlu3WxAvRma6g/viewform?usp=dialog"
                                >
                                    <ArticleIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="使い方ガイド">
                                <IconButton
                                    size="large"
                                    edge="start"
                                    sx={{ ml: 1 }}
                                    aria-label="help">
                                    <HelpOutlineIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="メニューを開く">
                                <IconButton
                                    size="large"
                                    edge="start"
                                    sx={{ ml: 1 }}
                                    aria-label="menu"
                                    onClick={handleHambergerMenu}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            {hambergerMenu && <Sidebar drawer={hambergerMenu} setDrawer={setHambergerMenu} loginUser={loginUser || undefined} />}
        </Box>
    );
};

export default MobileHeader;
