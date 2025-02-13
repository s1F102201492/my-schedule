'use client'

import React, { createContext, useState, ReactNode, useEffect } from 'react';

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
  todoAdd: (newTodo: TodoProps) => void
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

// タスクを追加する関数
  const todoAdd = (newTodo: TodoProps) => {
    setTodos((prevTodos) => {
      return [...prevTodos, newTodo];
    })
  }

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
    <TodoContext.Provider value={{ todos, setTodos, toggleChecked, todoAdd , fetchAllTodos }}>
      {loading ? <p>Loading...</p> : children}
    </TodoContext.Provider>
  );
  };