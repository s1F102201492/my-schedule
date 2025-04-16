'use client';

import React, { useContext } from 'react';
import Header from '../components/Header';
import AllTodoList from '../allListcomponents/AllTodoList';
import { Typography } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

const page = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error(
            'TodoContext is undefined. Make sure to use TodoProvider.',
        );
    }

    const { loginUser } = authContext;
    console.log(loginUser)

    return (
        <div>
            <Header />
            <Typography
                variant='h4'
                fontFamily='Monospace'
                component='div'
                sx={{ m: 4 }}>
                {/* {loginUser!.name}さんの習慣一覧 */}
            </Typography>
            <AllTodoList />
        </div>
    );
};

export default page;
