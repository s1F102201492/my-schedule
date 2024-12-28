import { Button, Card, CardActions, CardContent, CardHeader, Paper, Typography } from '@mui/material'
import React from 'react'

interface TodoProps {
    id: string;
    title: string;
    description: string | null;
    continuedays: number;
    checked: Boolean;
    priority: string;
    startdate: string;
    enddate: string;
    interval: number | null;
  };
  
interface TodoItemProps {
    todos: TodoProps;
}

const TodoChecked: React.FC<TodoItemProps> = ({ todos }) => {
  return (
    <div style={{opacity: 0.4}}>
        <Card sx={{ mx: 2, mb: 2, boxShadow: 3 }}>
            <CardHeader title={todos.title} />
            <CardContent>
                <Typography>
                    {todos.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant='contained'>元に戻す</Button>
                <Button variant='outlined'>編集</Button>
                <Button variant='outlined'>削除</Button>
            </CardActions>
        </Card>
    </div>
  )
}

export default TodoChecked