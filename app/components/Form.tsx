'use client'

import React, { useContext, useState } from 'react'
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, MenuItem, Switch, TextField } from '@mui/material';
import { DateComponents } from '../components/DateComponents';
import { TodoContext } from './TodoContext';

interface TodoProps {
  id: string;
  title: string;
  description: string | null;
  continuedays: number;
  checkedDates: Record<string, boolean>
  startdate: string;
  enddate: string;
  interval: number | string[];
}

interface FormProps {
    taskList: TodoProps[];
    setTaskList: React.Dispatch<React.SetStateAction<TodoProps[]>>;
  }

const Form: React.FC<FormProps> = () => {

  const todoContext = useContext(TodoContext);
  
  if (!todoContext) {
    throw new Error('TodoContext is undefined. Make sure to use TodoProvider.');
  }

  const { todos, setTodos } = todoContext;

  const [open, setOpen] = useState<boolean>(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [input, setInput] = useState<string>('');
  const handletask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(input)

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
              value={input}
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
            <DialogContentText mt={2}>
              繰り返し日
            </DialogContentText>
            <FormGroup row>
              {['月', '火', '水', '木', '金', '土', '日'].map((day) => (
                <FormControlLabel
                  key={day}
                  control={
                    <Checkbox
                      value={day}
                      onChange={handleCheckbox}
                      // checked={selectedDays.includes(day)}
                    />
                  }
                  label={day}
                />
              ))}
            </FormGroup>
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