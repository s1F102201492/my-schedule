'use client';

import { useContext } from 'react';
import { TodoContext } from './context/TodoContext';
import { Typography } from '@mui/material';
import Header from './components/Header';
import TodoList from './listcomponents/TodoList';
import FadeLoading from './components/parts/FadeLoading';
import { AuthContext } from './context/AuthContext';

export default function Home() {
    const todoContext = useContext(TodoContext);

    if (!todoContext) {
        throw new Error(
            'TodoContext is undefined. Make sure to use TodoProvider.',
        );
    }

    const { loading } = todoContext;

    // const authContext = useContext(AuthContext);

    // if (!authContext) {
    //     throw new Error(
    //         'TodoContext is undefined. Make sure to use TodoProvider.',
    //     );
    // }

    // const { loginUser } = authContext;

    return (
        <div>
            <Header />
            <Typography variant='h4' sx={{ m: 4 }}>
                {/* {loginUser!.name}さん！ようこそ！ */}
            </Typography>
            { loading ? <FadeLoading loading={loading} /> : <TodoList locate={"/"} />}
        </div>
    );
}
