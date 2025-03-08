'use client';

import React from 'react';
import Header from '../components/Header';
import Calendar from '../components/Calendar';
import Form from '../components/Form';

const page = () => {
    return (
        <div>
            <Header />
            <Form />
            <Calendar />
        </div>
    );
};

export default page;
