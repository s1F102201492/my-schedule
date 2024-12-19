'use client'

import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

interface SidebarProps {
  open: boolean;
  toggleDrawer: (open: boolean) => () => void;
}

export default function Sidebar({ open, toggleDrawer }: SidebarProps) {
  return (
    <Drawer open={open} onClose={() => {toggleDrawer(false)}}>
      <Box sx={{ width: 250 }} role="presentation">
        {/* ハンバーガーアイコンをサイドバーの内部にも表示して、クリックでドロワーを閉じる */}
        <IconButton onClick={() => {toggleDrawer(false)}} sx={{ mt: 1, ml: 1 }}>
          <MenuIcon />
        </IconButton>
        <List onClick={() => {toggleDrawer(false)}}>
          {['Menu1', 'Menu2', 'Menu3', 'Menu4'].map((text) => (
            <ListItem key={text}>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
