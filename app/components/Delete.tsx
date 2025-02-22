'use client';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React, { useContext, useState } from 'react'
import { TodoContext } from './TodoContext';
import { useRouter } from 'next/navigation';
import DeleteIcon from '@mui/icons-material/Delete';

interface oneTodo {
    onetodo: TodoProps
}

interface TodoProps {
    id: number,
    title: string,
    description: string | null,
    continuedays: number,
    checkedDates: Record<string, boolean>,
    startdate: string,
    enddate: string,
    interval: number | string[],
    color: string
}

const deleteTodo = async (todo: TodoProps) => {
  
      const res = await fetch(`/api/todo/${todo.id}`,
       { method: "DELETE",
         body: JSON.stringify({todo}),
         headers: {
          "Content-type": "application/json",
         }
       });
      
       return res.json();
    };

const Delete:React.FC<oneTodo> = ({ onetodo }) => {
    const router = useRouter();
    
    const todoContext = useContext(TodoContext);
        
    if (!todoContext) {
        throw new Error('TodoContext is undefined. Make sure to use TodoProvider.');
    }

    const { todos, setTodos, fetchAllTodos } = todoContext;

    // フォームのオープン
    const [open, setOpen] = useState<boolean>(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => { //閉じたらすべてリセット
        setOpen(false);
    }
    
    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();

        setTodos((prevTodos) => {
            return prevTodos.filter((todo) => todo.id !== onetodo.id);
        })

        const targetTodo = todos.find((todo) => todo.id === onetodo.id);
        if (!targetTodo) return;

        await deleteTodo(targetTodo)

        await fetchAllTodos();
        setOpen(false);
        router.push("/list");
        router.refresh();
    };

  return (
    <div>
        <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleClickOpen}>削除</Button>
        <Dialog
        fullWidth
        open={open}
        onClose={handleClose}>
        <form onSubmit={handleDelete}>
          <DialogTitle sx={{m: 1}} variant='h4'>本当に削除しますか？</DialogTitle>
          <DialogContent>
            <DialogContentText variant='h6'>
              タイトル名：{onetodo.title}
            </DialogContentText>
            </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>戻る</Button>
            <Button type="submit" value="submit"
            variant='contained' color='error'>削除</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default Delete