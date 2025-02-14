'use client'

import { Box, Grid2 } from '@mui/material';
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import FadeLoader from "react-spinners/FadeLoader";

interface TodoProps {
  id: number;
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
  toggleChecked: (id: number, date: string) => void;
  fetchAllTodos: () => Promise<void>
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAllTodos = async () => {
    try {
      const res = await fetch("/api/todo", { cache: "no-store" });
      const data = await res.json();
      setTodos(data.alltodos);
    } catch (error) {
      console.error("データの取得に失敗しました:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTodos();
  }, []);

// チェックボタンを機能させる関数
  const toggleChecked = (id: number, date: string) => {
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
    <TodoContext.Provider value={{ todos, setTodos, toggleChecked, fetchAllTodos }}>
      {loading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <FadeLoader color="#2196f3" />
    </Box>
  ) : children}
    </TodoContext.Provider>
  );
  };