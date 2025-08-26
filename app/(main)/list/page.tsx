'use client';

import React, { useContext } from 'react';
import Header from '../../components/Header';
import AllTodoList from '../../allListcomponents/AllTodoList';
import { Typography } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import { TodoContext } from '../../context/TodoContext';
import FadeLoading from '../../components/parts/FadeLoading';
import NullUser from '../../components/NullUser';

const Page = () => {
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

    return (
        <div>
            <Header />
            {loginUser ? (
                <>
                <Typography variant="h4" sx={{ m: 4 }}>
                    {loginUser.username} さん！ようこそ！
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

export default Page;
