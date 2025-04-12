'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { signout } from '../userauth/action';

interface SidebarProps {
    drawer: boolean;
    setDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ drawer, setDrawer }: SidebarProps) {
    return (
        <Drawer
            open={drawer}
            anchor="right"
            onClose={() => setDrawer(false)}>
            <Box
                sx={{ width: 250 }}
                role='presentation'>
                {/* ハンバーガーアイコンをサイドバーの内部にも表示して、クリックでドロワーを閉じる */}
                <List>
                    {['Menu1', 'Menu2', 'Menu3', 'Menu4'].map((text) => (
                        <ListItem key={text}>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                        
                    ))}
                    <ListItem key="logout">
                        <ListItemButton onClick={signout}>
                            <ListItemText primary="ログアウト" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
}
