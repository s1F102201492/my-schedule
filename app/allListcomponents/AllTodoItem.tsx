import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import React from 'react'
import Detail from '../components/Detail';

interface TodoProps {
    id: number;
    title: string;
    description: string;
    continuedays: number;
    checkedDates: Record<string, boolean>;
    startdate: string;
    enddate: string;
    interval: number | string[];
    color: string;
    // intervalには数字か配列（曜日を格納する）
  };
  
interface TodoItemProps {
    todo: TodoProps;
};

const AllTodoItem:React.FC<TodoItemProps> = ({ todo }) => {
    
  return (
    <div>
        <Card sx={{ mx: 2, mb: 2, boxShadow: 3 }}>
            <CardHeader title={todo.title} />
            <CardContent>
                <Typography>
                    {todo.continuedays}日達成
                </Typography>
            </CardContent>
            <CardActions>
                <Detail todo={todo} />
            </CardActions>
        </Card>
    </div>
  )
}

export default AllTodoItem