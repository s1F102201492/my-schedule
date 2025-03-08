'use client';

import { useContext } from 'react';
import { TodoContext } from './components/TodoContext';
import { Typography } from '@mui/material';
import Header from './components/Header';
import TodoList from './listcomponents/TodoList';

export default function Home() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const todoContext = useContext(TodoContext);

    if (!todoContext) {
        throw new Error(
            'TodoContext is undefined. Make sure to use TodoProvider.',
        );
    }

    const { todos } = todoContext;

    return (
        <div>
            <Header />
            <Typography
                variant='h4'
                fontFamily='Monospace'
                component='div'
                sx={{ m: 4 }}>
                {`${year}年${month}月${day}日`}のやることリスト
            </Typography>
            <TodoList todos={todos} />
        </div>
    );
}
