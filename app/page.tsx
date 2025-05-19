'use client';

import { useContext } from 'react';
import { TodoContext } from './context/TodoContext';
import { Typography } from '@mui/material';
import Header from './components/Header';
import TodoList from './listcomponents/TodoList';
import FadeLoading from './components/parts/FadeLoading';
import { AuthContext } from './context/AuthContext';
import NullUser from './components/NullUser';

export default function Home() {
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
    console.log(loginUser);

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
                    <TodoList locate="/" />
                )}
                </>
            ) : (
                <NullUser />
            )}
        </div>

    );
}
