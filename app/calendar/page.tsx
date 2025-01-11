'use client'

import React, { useState } from 'react'
import Header from '../components/Header'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Switch, TextField } from '@mui/material';
import { DateComponents } from '../components/DateComponents';
import Calendar from '../components/Calendar';
import Form from '../components/Form';

const page = () => {

  return (
    <div>
      <Header />
      <Form />
      <Calendar />
    </div>
  )
}

export default page