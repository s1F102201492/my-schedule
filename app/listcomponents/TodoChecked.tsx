import { Button, Card, CardActions, CardContent, CardHeader, Checkbox, IconButton, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

interface TodoProps {
    id: string;
    title: string;
    description: string | null;
    continuedays: number;
    checkedDates: Record<string, boolean> | Record<string, undefined>;
    startdate: string;
    enddate: string;
    interval: number | string[]; 
    // intervalには数字か配列（曜日を格納する）
  };
  
interface TodoItemProps {
    todos: TodoProps;
}

const TodoChecked: React.FC<TodoItemProps> = ({ todos }) => {
    const [checked, setChecked] = useState<boolean>(true)
    
      const handlecheck = () => {
        setChecked(!checked)
      }

  return (
    <div style={{opacity: 0.4}}>
        <ListItem>
          <Checkbox
          value={checked}
          onClick={handlecheck} />
          <ListItemText primary={todos.title} />
          {todos.continuedays + 1}日目
        </ListItem>
    </div>
  )
}

export default TodoChecked