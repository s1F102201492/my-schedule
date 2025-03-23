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
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';

const Header = () => {
    const pathname = usePathname();

    return (
        <Box>
            <AppBar
                position='static'
                sx={{ backgroundColor: 'primary' }}>
                <Toolbar>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ marginRight: 6 }}>
                        Best practice
                    </Typography>
                    <BottomNavigation
                        showLabels
                        value={pathname}
                        sx={{ flexGrow: 1, backgroundColor: 'inherit' }}>
                        <BottomNavigationAction
                            label='Home'
                            value='/'
                            icon={<HomeIcon />}
                            component={Link}
                            href='/'
                            sx={{
                                '&.Mui-selected': {
                                    color:
                                        pathname === '/'
                                            ? 'primary.light'
                                            : 'inherit',
                                },
                                whiteSpace: 'nowrap',
                            }}
                        />
                        <BottomNavigationAction
                            label='カレンダー'
                            value='/calendar'
                            icon={<EventIcon />}
                            component={Link}
                            href='/calendar'
                            sx={{
                                '&.Mui-selected': {
                                    color:
                                        pathname === '/calendar'
                                            ? 'primary.light'
                                            : 'inherit',
                                },
                                whiteSpace: 'nowrap',
                            }}
                        />
                        <BottomNavigationAction
                            label='タスク一覧'
                            value='/list'
                            icon={<FormatListNumberedIcon />}
                            component={Link}
                            href='/list'
                            sx={{
                                '&.Mui-selected': {
                                    color:
                                        pathname === '/list'
                                            ? 'primary.light'
                                            : 'inherit',
                                },
                                whiteSpace: 'nowrap',
                            }}
                        />
                        <BottomNavigationAction
                            label='AI Analytics'
                            value='/analytics'
                            icon={<EqualizerOutlinedIcon />}
                            component={Link}
                            href='/analytics'
                            sx={{
                                '&.Mui-selected': {
                                    color:
                                        pathname === '/analytics'
                                            ? 'primary.light'
                                            : 'inherit',
                                },
                                whiteSpace: 'nowrap',
                            }}
                        />
                    </BottomNavigation>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
