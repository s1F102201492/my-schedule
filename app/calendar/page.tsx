'use client';

import React, { useContext } from 'react';
import Header from '../components/Header';
import Calendar from '../components/Calendar';
import { Box } from '@mui/material';
import { TodoContext } from '../components/TodoContext';
import FadeLoading from '../components/parts/FadeLoading';

const page = () => {
    const todoContext = useContext(TodoContext);

    if (!todoContext) {
        throw new Error(
            'TodoContext is undefined. Make sure to use TodoProvider.',
        );
    }

    const { loading } = todoContext;

    return (
        <div>
            <Header />
            { loading ?
            <FadeLoading loading={loading} /> :
            <Box sx={{ mt: 4, width: '100%' }} >
                <Calendar />
            </Box>}
        </div>
    );
};

export default page;
