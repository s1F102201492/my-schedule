'use client';

import React, { useState } from 'react'
import Header from '../components/Header'
import { Box, Button } from '@mui/material';
import { Edit } from '@mui/icons-material'
import GoalSetting from '../components/goal/GoalSetting';

const page = () => {
  const [goalsettingform, setGoalsettingform] = useState<boolean>(false);
  const openform = () => {
    setGoalsettingform(!goalsettingform);
  }

  return (
    <div>
      <Header />
      <Box sx={{ m: 3 }}>
        <Button variant="contained" startIcon={<Edit />} onClick={openform}>
          目標を編集
        </Button>
      </Box>
      {goalsettingform && <GoalSetting open={goalsettingform} onClose={openform}/>}
    </div>
  )
}

export default page