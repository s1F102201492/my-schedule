import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import React from 'react'

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
    todo: TodoProps;
};

const AllTodoItem:React.FC<TodoItemProps> = ({ todo }) => {
    const descriptionnull = (description:string | null) => {
        if (description === 'string') { //詳細が書かれている場合はtrue,ない場合はfalse
            return true;
        } else {
            return false;
        }
    }
  return (
    <div>
        <Card sx={{ mx: 2, mb: 2, boxShadow: 3 }}>
            <CardHeader title={todo.title} />
            <CardContent>
                {/* <Typography>
                    詳細:{descriptionnull(todo.description) ? todo.description : 'なし' }
                </Typography> */}
                <Typography>
                    {todo.continuedays}日達成
                </Typography>
                
            </CardContent>
            <CardActions>
                <Button variant='outlined'>詳細</Button>
                <Button variant='outlined'>削除</Button>
            </CardActions>
        </Card>
    </div>
  )
}

export default AllTodoItem