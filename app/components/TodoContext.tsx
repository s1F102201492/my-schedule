'use client'

import React, { createContext, useState, ReactNode } from 'react';

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

  interface TodoContextType {
    todos: TodoProps[];
    setTodos: React.Dispatch<React.SetStateAction<TodoProps[]>>;
  }

  export const TodoContext = createContext<TodoContextType | undefined>(undefined);

  export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const createId = () => Math.random().toString(36).substring(2);

    const initialtodos: TodoProps[] = [
      {
        id: createId(),
        title: 'プログラミングの勉強',
        description: null,
        continuedays: 7,
        checked: false,
        startdate: '2025/01/01',
        enddate: '2025/03/31',
        interval: 2
      },
      {
        id: createId(),
        title: 'ランニング',
        description: null,
        continuedays: 4,
        checked: true,
        startdate: '2025/01/01',
        enddate: '2025/01/31',
        interval: ['月', '水', '日']
      },
      {
        id: createId(),
        title: '筋トレ',
        description: null,
        continuedays: 4,
        checked: false,
        startdate: '2025/01/01',
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