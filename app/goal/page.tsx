'use client';

import React, { useContext } from 'react';
import Header from '../components/Header';
import GoalSetting from '../components/goal/GoalSetting';
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
            <GoalSetting /> }
        </div>
    );
};

export default page;
