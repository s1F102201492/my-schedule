import React, { useContext, useState } from 'react'
import { Checkbox, IconButton, ListItem, ListItemText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TodoContext } from '../components/TodoContext';

interface TodoProps {
    id: string;
    title: string;
    description: string | null;
    continuedays: number;
    checkedDates: Record<string, boolean | undefined>;
    startdate: string;
    enddate: string;
    interval: number | string[]; 
    // intervalには数字か配列（曜日を格納する）
  };
  
interface TodoItemProps {
    todos: TodoProps;
};

const TodoItem: React.FC<TodoItemProps> = ({ todos }) => {
  const todoContext = useContext(TodoContext);

  if (!todoContext) {
    throw new Error('TodoContext is undefined. Make sure to use TodoProvider.');
  }

  const { toggleChecked } = todoContext;
  const todayHyphen = new Date().toISOString().split('T')[0]; // Format today as 'yyyy-mm-dd'

  const handleCheck = () => {
    toggleChecked(todos.id, todayHyphen);
  };
  
  return (
    <div>
        <ListItem>
        <Checkbox
        checked={!!todos.checkedDates[todayHyphen]}
        onChange={handleCheck} />
          <ListItemText primary={todos.title} />
          {todos.continuedays + 1}日目
          <IconButton aria-label="delete">
          <DeleteIcon />
          </IconButton>
        </ListItem>
    </div>
  )
}

export default TodoItem