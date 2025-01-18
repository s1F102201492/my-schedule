'use client';

import { useContext } from 'react';
import { TodoContext } from './components/TodoContext';
import { Typography } from '@mui/material';
import Header from './components/Header';
import TodoList from './listcomponents/TodoList';

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
}

export default function Home() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const todoContext = useContext(TodoContext);

  if (!todoContext) {
    throw new Error('TodoContext is undefined. Make sure to use TodoProvider.');
  }

  const { todos } = todoContext;

  return (
    <div>
      <Header />
      <Typography
        variant="h4"
        fontFamily="Monospace"
        component="div"
        sx={{ m: 4 }}
      >
        {`${year}年${month}月${day}日`}のやることリスト
      </Typography>
      {/* 今後、必要であれば setTodos も使用できる */}
      <TodoList todos={todos} />
    </div>
  );
}
