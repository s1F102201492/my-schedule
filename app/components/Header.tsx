'use client'

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
import MenuIcon from '@mui/icons-material/Menu';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import Link from 'next/link';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

const Header = () => {
  const [value, setValue] = React.useState('');
  
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ marginRight: 6 }}>
            My schedule
          </Typography>
          {/* ここから */}
          <BottomNavigation
            showLabels
            value={value}
            onChange={handleChange}
            sx={{ flexGrow: 1, backgroundColor: 'inherit' }}
          >
            <BottomNavigationAction 
              label="Home" 
              value='Home'
              icon={<HomeIcon />} 
              component={Link} 
              href="/"
            />
            <BottomNavigationAction 
              label="カレンダー" 
              value='calender'
              icon={<EventIcon />} 
              component={Link} 
              href="/calendar"
            />
            <BottomNavigationAction 
              label="タスク一覧" 
              value='list'
              icon={<FormatListNumberedIcon />}
              component={Link}
              href="/list" 
            />
            <BottomNavigationAction 
              label="My Goal" 
              value='goal'
              icon={<SportsScoreIcon />} 
              href="/goal"
            />
          </BottomNavigation>
          {/* ここまでをBottom navigationに変更 */}
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;