'use client';

import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { Typography } from '@mui/material';
import Header from '../components/Header';
import TodoList from '../listcomponents/TodoList';
import FadeLoading from '../components/parts/FadeLoading';
import { AuthContext } from '../context/AuthContext';

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

            <TodoList />
        </div>

    );
}
