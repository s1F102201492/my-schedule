import React, { useState } from 'react'
import { Checkbox, IconButton, ListItem, ListItemText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface TodoProps {
    id: string;
    title: string;
    description: string | null;
    continuedays: number;
    checked: boolean;
    startdate: string;
    enddate: string;
    interval: number | string[]; 
    // intervalには数字か配列（曜日を格納する）
  };
  
interface TodoItemProps {
    todos: TodoProps;
};

const TodoItem: React.FC<TodoItemProps> = ({ todos }) => {
  const [checked, setChecked] = useState<boolean>(false)

  const handlecheck = () => {
    setChecked(!checked)
  }

  return (
    <div>
        <ListItem>
          <Checkbox
          value={checked}
          onClick={handlecheck} />
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