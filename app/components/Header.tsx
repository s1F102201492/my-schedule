'use client';

import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import EventIcon from '@mui/icons-material/Event';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import { Button, IconButton } from '@mui/material';
import Sidebar from './Sidebar';
import { AuthContext } from '../context/AuthContext';
import Image from 'next/image';

const Header = () => {
    const pathname = usePathname();

    const [drawer, setDrawer] = useState<boolean>(false);
    const userDrawer = () => {
        setDrawer(true);
    }

    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error(
            'TodoContext is undefined. Make sure to use TodoProvider.',
        );
    }

    const { loginUser } = authContext;
    
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
                            label='タスク追加'
                            value='/addTask'
                            icon={<AddBoxOutlinedIcon />}
                            component={Link}
                            href='/addTask'
                            sx={{
                                '&.Mui-selected': {
                                    color:
                                        pathname === '/addTask'
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
                    { loginUser ?
                        (<IconButton onClick={userDrawer} sx={{ p: 0 }}>
                                <Avatar alt={loginUser.username || 'User'} src={loginUser.avatar_url}
                                sx={{ width: 30, height: 30 }} />
                        </IconButton>) 
                        : <Button color='inherit'
                        component={Link} href="/userauth">ログイン</Button>}
                    
                </Toolbar>
            </AppBar>
            {drawer && <Sidebar drawer={drawer} setDrawer={setDrawer} loginUser={loginUser!} />}
        </Box>
    );
};

export default Header;
