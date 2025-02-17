'use client';

import React, { createContext, useState, ReactNode, useEffect } from 'react';
import Loader from './Loader';

interface TodoProps {
  id: number;
  title: string;
  description: string;
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
  fetchAllTodos: () => Promise<void>;
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAllTodos = async () => {
    try {
      const res = await fetch('/api/todo', { cache: 'no-store' });
      const data = await res.json();
      setTodos(data.alltodos);
    } catch (error) {
      console.error('データの取得に失敗しました:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkTodo = async (todo: TodoProps) => {
    try {
      const res = await fetch(`/api/todo/${todo.id}`, {
        method: 'PUT',
        body: JSON.stringify(todo),
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (!res.ok) throw new Error(`APIエラー: ${(await res.json()).message || '不明なエラー'}`);
      console.log('チェック更新成功');
    } catch (error) {
      console.error('チェック更新エラー:', error);
    }
  };

  useEffect(() => {
    fetchAllTodos();
  }, []);

  const toggleChecked = async (id: number, date: string) => { //タスクのチェックボタン
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, checkedDates: { ...todo.checkedDates, [date]: !todo.checkedDates[date] } } : todo
      )
    );

    const targetTodo = todos.find((todo) => todo.id === id);
    if (!targetTodo) return;

    await checkTodo({ ...targetTodo, checkedDates: { ...targetTodo.checkedDates, [date]: !targetTodo.checkedDates[date] } });
    fetchAllTodos();
  };

  return (
    <TodoContext.Provider value={{ todos, setTodos, toggleChecked, fetchAllTodos }}>
      {loading ? <Loader loading={loading} /> : children}
    </TodoContext.Provider>
  );
};
