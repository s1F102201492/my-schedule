import { Checkbox, ListItem, ListItemText } from '@mui/material'
import React, { useContext, useState } from 'react'
import { TodoContext } from '../components/TodoContext';

interface TodoProps {
    id: number;
    title: string;
    description: string;
    continuedays: number;
    checkedDates: Record<string, boolean | undefined>;
    startdate: string;
    enddate: string;
    interval: number | string[]; 
    // intervalには数字か配列（曜日を格納する）
  };
  
interface TodoItemProps {
    todo: TodoProps;
}

const TodoChecked: React.FC<TodoItemProps> = ({ todo }) => {
  const todoContext = useContext(TodoContext);
  
    if (!todoContext) {
      throw new Error('TodoContext is undefined. Make sure to use TodoProvider.');
    }
  
    const { toggleChecked } = todoContext;
    const todayHyphen = new Date().toISOString().split('T')[0]; // Format today as 'yyyy-mm-dd'
  
    const handleCheck = () => {
      toggleChecked(todo.id, todayHyphen);
    };
    
  return (
    <div style={{opacity: 0.4}}>
        <ListItem>
          <Checkbox
          checked={!!todo.checkedDates[todayHyphen]}
          onChange={handleCheck} />
          <ListItemText primary={todo.title} />
          {todo.continuedays + 1}日目
        </ListItem>
    </div>
  )
}

export default TodoChecked