'use client'

import React, { useState } from 'react'
import Calender from '../components/Calender'
import Header from '../components/Header'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Switch, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { DateComponents } from '../components/DateComponents';
import TimeComponents from '../components/TimeComponents';

interface priorprops {
  value: string;
  label: string;
}

const priorities:priorprops[] = [
  {
    value: '低',
    label: 'low',
  },
  {
    value: '中',
    label: 'middle',
  },
  {
    value: '高',
    label: 'high',
  },
];

const page = () => {
  const [open, setOpen] = useState<boolean>(false);
  
  // 終日（時間設定なし）の場合はtrue
  const [time, setTime] = useState<boolean>(true);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTimeSet = () => setTime(!time)

  const handleSubmit = () => {

  }

  return (
    <div>
      <Header />
      <Box sx={{m: 2}}>
        <Button variant="contained" onClick={handleClickOpen}>
          Open form dialog
        </Button>
      </Box>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          {/* フォーム全体をフォームタグで囲む */}
          <DialogTitle m={1}>タスクや習慣を追加する</DialogTitle>
          <DialogContent>
            <DialogContentText>
              タイトル
            </DialogContentText>
            <TextField
              required
              margin="dense"
              fullWidth
              variant="outlined"
            />
            <DialogContentText mt={1}>
              内容
            </DialogContentText>
            <TextField
              multiline
              margin="dense"
              fullWidth
              variant="outlined"
              rows={3}
            />
            <DialogContentText mt={1}>
              優先度
            </DialogContentText>
            <TextField
              select
              required
              margin="dense"
              fullWidth
              variant="outlined"
              defaultValue='低'
            >
              {priorities.map((prior: priorprops, index: number) => (
                <MenuItem key={index} value={prior.value}>
                  {prior.value}
                </MenuItem>
              ))}
            </TextField>
            <Box sx={{ flexDirection: 'row' }}>
              終日 {time ? 'オン' : 'オフ'}
              <Switch 
              checked={time}
              onChange={handleTimeSet} />
              <DialogContentText mt={1}>
                開始時刻
              </DialogContentText>
              <DateComponents />
              <TimeComponents checktime={time}/>
            </Box>
            <Box sx={{ flexDirection: 'row' }}>
              <DialogContentText mt={1}>
                終了時刻
              </DialogContentText>
              <DateComponents />
              <TimeComponents checktime={time}/>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>閉じる</Button>
            <Button type="submit" variant='contained'>追加</Button>
          </DialogActions>
        </form>
      </Dialog>
      <Calender />
    </div>
  )
}

export default page