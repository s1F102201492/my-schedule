'use client'

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';

const Header = () => {
  const [open, setOpen] = useState(false); // サイドバーの開閉状態を管理

  // サイドバーを開閉するための toggleDrawer 関数
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // アイコンのクリックでドロワーをトグルするための関数
  const handleDrawerToggle = () => {
    setOpen(!open); // open の状態を反転することで、開閉をトグル
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="sidebar"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle} // ドロワーの開閉をトグルするために onClick に handleDrawerToggle を設定
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            My schedule
          </Typography>
          <Button color="inherit">ログイン</Button>
        </Toolbar>
      </AppBar>
      <Sidebar open={open} toggleDrawer={toggleDrawer} />
    </Box>
  );
}

export default Header;
