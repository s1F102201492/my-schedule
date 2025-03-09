'use client';

import React from 'react';
import Header from '../components/Header';
import Calendar from '../components/Calendar';
import { Box } from '@mui/material';

const page = () => {
    return (
        <div>
            <Header />
            <Box sx={{ mt: 4, width: '100%' }} >
                <Calendar />
            </Box>
        </div>
    );
};

export default page;
