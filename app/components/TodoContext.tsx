'use client'

import React, { createContext, useState, ReactNode } from 'react';

interface TodoProps {
  id: string;
  title: string;
  description: string | null;
  continuedays: number;
  checkedDates: Record<string, boolean> | Record<string, undefined>;
  startdate: string;
  enddate: string;
  interval: number | string[];
}

interface TodoContextType {
  todos: TodoProps[];
  setTodos: React.Dispatch<React.SetStateAction<TodoProps[]>>;
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const createId = () => Math.random().toString(36).substring(2);

  const counterContinuedays = (checkedDates:Record<string, boolean>) => {
    let counter: number = 0
    for (const elem in checkedDates) {
      if (checkedDates[elem] === true) {
        counter += 1;
      }
    }
    return counter;
  }

  const initialtodos: TodoProps[] = [
    {
      id: createId(),
      title: 'プログラミングの勉強',
      description: null,
      continuedays: counterContinuedays({
        "2025-01-02": true,
        "2025-01-04": false,
        "2025-01-06": true,
        "2025-01-28": false
      }),
      checkedDates: {
        "2025-01-02": true,
        "2025-01-04": false,
        "2025-01-06": true,
        "2025-01-28": false
      },
      startdate: '2025/01/02',
      enddate: '2025/03/31',
      interval: 2
    },
    {
      id: createId(),
      title: 'ランニング',
      description: null,
      continuedays: 3,
      checkedDates: {
        "2025-01-01": true,
        "2025-01-05": false,
        "2025-01-06": true
      },
      startdate: '2025/01/01',
      enddate: '2025/01/31',
      interval: ['月','火','土']
    },
    {
      id: createId(),
      title: '筋トレ',
      description: null,
      continuedays: 3,
      checkedDates: {
        "2025-01-06": true,
        "2025-01-09": false,
        "2025-01-12": true
      },
      startdate: '2025/01/07',
      enddate: '2025/02/01',
      interval: 3,
    }
  ];

  const [todos, setTodos] = useState<TodoProps[]>(initialtodos);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
  };