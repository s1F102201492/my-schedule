'use client'

import React, { useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Switch, TextField } from '@mui/material';
import { DateComponents } from '../components/DateComponents';

interface TodoProps {
  id: string;
  title: string;
  description: string | null;
  continuedays: number;
  checked: boolean;
  startdate: string;
  enddate: string;
  interval: number | string[];
}

interface FormProps {
    taskList: TodoProps[];
    setTaskList: React.Dispatch<React.SetStateAction<TodoProps[]>>;
  }

const Form: React.FC<FormProps> = ({taskList, setTaskList}) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [task, setTask] = useState<string>('');
    const handletask = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value)
    }
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // setTaskList([...taskList, {
        //     title: task,
        //     startdate: ,
        //     enddate: ,
        // }])
    };

  return (
    <div>
        <Box sx={{m: 2}}>
        <Button variant="contained" onClick={handleClickOpen}>
          予定を追加
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
              value={task}
              onChange={handletask}
            />
            
            <Box sx={{ flexDirection: 'row' }}>
              <DialogContentText mt={1}>
                開始日
              </DialogContentText>
              <DateComponents />
            </Box>
            <Box sx={{ flexDirection: 'row' }}>
              <DialogContentText mt={1}>
                終了日
              </DialogContentText>
              <DateComponents />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>閉じる</Button>
            <Button type="submit" variant='contained'>追加</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default Form