import React from 'react';
import Header from '../components/Header';
import AllTodoList from '../allListcomponents/AllTodoList';
import { Typography } from '@mui/material';

const page = () => {
    return (
        <div>
            <Header />
            <Typography
                variant='h4'
                fontFamily='Monospace'
                component='div'
                sx={{ m: 4 }}>
                userさんの習慣一覧
            </Typography>
            <AllTodoList />
        </div>
    );
};

export default page;
