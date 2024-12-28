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
  checked: Boolean;
  priority: string;
  startdate: string;
  enddate: string;
  interval: number | null;
};

export default function Home() {
  const createId = () => Math.random().toString(36).substring(2)

  const initialtodos = [
    {
      id: createId(),
      title: 'プログラミングの勉強',
      description: 'react',
      continuedays: 7,
      checked: false,
      priority: 'high',
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
      priority: 'middle',
      startdate: '2025/01/01',
      enddate: '2025/01/31', 
      interval: null
    },
    {
      id: createId(),
      title: '筋トレ',
      description: '胸を鍛える',
      continuedays: 4,
      checked: false,
      priority: 'row',
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
        2025/01/01のやることリスト
      </Typography>
      <TodoList todos={initialtodos}/>
    </div>
  );
}
