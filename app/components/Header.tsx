'use client';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ marginRight: 6 }}>
            Best practice
          </Typography>
          <BottomNavigation
            showLabels
            value={pathname} // 現在のページのパスを value に設定
            sx={{ flexGrow: 1, backgroundColor: 'inherit' }}
          >
            <BottomNavigationAction 
              label="Home" 
              value="/" // pathname と一致するように設定
              icon={<HomeIcon />} 
              component={Link} 
              href="/"
            />
            <BottomNavigationAction 
              label="カレンダー" 
              value="/calendar"
              icon={<EventIcon />} 
              component={Link} 
              href="/calendar"
            />
            <BottomNavigationAction 
              label="タスク一覧" 
              value="/list"
              icon={<FormatListNumberedIcon />}
              component={Link}
              href="/list" 
            />
            <BottomNavigationAction 
              label="My Goal" 
              value="/goal"
              icon={<SportsScoreIcon/>} 
              component={Link}
              href="/goal"
            />
          </BottomNavigation>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
