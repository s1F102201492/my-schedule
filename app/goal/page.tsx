'use client';

import React, { useState } from 'react'
import Header from '../components/Header'
import { Button } from '@mui/material';
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
      <Button variant="contained" startIcon={<Edit />} onClick={openform}>
        目標を編集
      </Button>
      {goalsettingform && <GoalSetting open={goalsettingform} onClose={openform}/>}
    </div>
  )
}

export default page