import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActions, CardHeader, Typography } from '@mui/material';

interface TodoProps {
    id: string;
    title: string;
    description: string | null;
    continuedays: number | null;
    checked: Boolean;
    priority: string;
    startdate: string;
    enddate: string;
    starttime: string | null;
    endtime: string | null;
    interval: number | null;
  };
  
interface TodoItemProps {
    todos: TodoProps;
}

const TodoItem: React.FC<TodoItemProps> = ({ todos }) => {
  return (
    <div>
        <Card sx={{ mt: 2, mx: 2, boxShadow: 3 }}>
            <CardHeader title={todos.title} />
            <CardContent>
                <Typography>
                    {todos.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant='contained'>完了</Button>
                <Button variant='outlined'>編集</Button>
                <Button variant='outlined'>削除</Button>
            </CardActions>
        </Card>
    </div>
  )
}

export default TodoItem