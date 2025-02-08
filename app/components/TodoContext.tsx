'use client'

import React, { createContext, useState, ReactNode } from 'react';

interface TodoProps {
  id: string;
  title: string;
  description: string | null;
  continuedays: number;
  checkedDates: Record<string, boolean>;
  startdate: string;
  enddate: string;
  interval: number | string[];
  color: string;
}

interface TodoContextType {
  todos: TodoProps[];
  setTodos: React.Dispatch<React.SetStateAction<TodoProps[]>>;
  toggleChecked: (id: string, date: string) => void;
  todoAdd: (newTodo: TodoProps) => void
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const initialtodos: TodoProps[] = [
    {
      id: 'fdasf2121fs',
      title: 'プログラミングの勉強',
      description: null,
      continuedays: 2,
      checkedDates: {
        "2025-01-02": true,
        "2025-01-04": false,
        "2025-01-06": true,
        "2025-01-28": false,
        "2025-01-30": false,
      },
      startdate: '2025/01/02',
      enddate: '2025/03/31',
      interval: 3,
      color: 'blue'
    },
    {
      id: 'dfawefwe335',
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
      interval: ['月','火','土'],
      color: 'yellow'
    },
    {
      id: '4f35se4354w',
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
      color: 'green'
    }
  ];

  const [todos, setTodos] = useState<TodoProps[]>(initialtodos);

// タスクを追加する関数
  const todoAdd = (newTodo: TodoProps) => {
    setTodos((prevTodos) => {
      return [...prevTodos, newTodo];
    })
  }

// チェックボタンを機能させる関数
  const toggleChecked = (id: string, date: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          const newCheckedDates = { ...todo.checkedDates };
          newCheckedDates[date] = !newCheckedDates[date];
          return { ...todo, checkedDates: newCheckedDates };
        }
        return todo;
      })
    );
  };
  
  return (
    <TodoContext.Provider value={{ todos, setTodos, toggleChecked, todoAdd }}>
      {children}
    </TodoContext.Provider>
  );
  };