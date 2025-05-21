'use client';

import React, { useContext } from 'react';
import Header from '../components/Header';
import AllTodoList from '../allListcomponents/AllTodoList';
import { Typography } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { TodoContext } from '../context/TodoContext';
import FadeLoading from '../components/parts/FadeLoading';
import NullUser from '../components/NullUser';

const page = () => {
    const todoContext = useContext(TodoContext);

    if (!todoContext) {
        throw new Error(
            'TodoContext is undefined. Make sure to use TodoProvider.',
        );
    }

    const { loading } = todoContext;

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
            {loginUser ? (
                <>
                <Typography variant="h4" sx={{ m: 4 }}>
                    {loginUser.name} さん！ようこそ！
                </Typography>
                {loading ? (
                    <FadeLoading loading={loading} />
                ) : (
                    <AllTodoList />
                )}
                </>
            ) : (
                <NullUser />
            )}
        </div>
    );
};

export default page;
