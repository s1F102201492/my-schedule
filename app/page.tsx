'use client'

import { Typography } from "@mui/material";
import Header from "./components/Header";
import TodoList from "./listcomponents/TodoList";
import { useState } from "react";

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

export default function Home() {
  const today = new Date()
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

console.log( year + '年' + month + '月' + day + '日');


  const createId = () => Math.random().toString(36).substring(2)

  const initialtodos:TodoProps[] = [
    {
      id: createId(),
      title: 'プログラミングの勉強',
      description: 'react',
      continuedays: 7,
      checked: false,
      startdate: '2025/01/01',
      enddate: '2025/03/31',
      interval: 2
    },
    {
      id: createId(),
      title: 'ランニング',
      description: '20分',
      continuedays: 4,
      checked: true,
      startdate: '2025/01/01',
      enddate: '2025/01/31',
      interval: ['月','水','日']
    },
    {
      id: createId(),
      title: '筋トレ',
      description: '胸を鍛える',
      continuedays: 4,
      checked: false,
      startdate: '2025/01/01',
      enddate: '2025/02/01',
      interval: 3,
    }
  ]

  const [todos, setTodos] = useState<TodoProps[]>(initialtodos)

  return (
    <div>
      <Header />
      <Typography variant="h4" fontFamily="Monospace"
      component="div" sx={{ m: 4 }}>
        {`${year}年${month}月${day}日`}のやることリスト
      </Typography>
      <TodoList todos={initialtodos}/>
    </div>
  );
}
