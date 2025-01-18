'use client'

import React, { useState } from 'react'
import Header from '../components/Header'
import Calendar from '../components/Calendar';
import Form from '../components/Form';
import { TodoContext } from '../components/TodoContext';

interface TodoProps {
  id: string;
  title: string;
  description: string | null;
  continuedays: number;
  checked: boolean;
  startdate: string;
  enddate: string;
  interval: number | string[];
}

const page = () => {
  const [taskList, setTaskList] = useState<TodoProps[]>([])

  return (
    <div>
      <Header />
      <Form taskList={taskList} setTaskList={setTaskList} />
      <Calendar />
    </div>
  )
}

export default page