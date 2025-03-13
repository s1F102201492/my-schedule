'use client';

import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { CountContinueDays } from './calculate/CountContinueDays';
import FadeLoading from './FadeLoading';
import Header from './Header';

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
    toggleDelete: (id: number, date: string) => void;
    loading: boolean;
}

export const TodoContext = createContext<TodoContextType | undefined>(
    undefined,
);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [todos, setTodos] = useState<TodoProps[]>([]);
    const [loading, setLoading] = useState(true);

    // データベースから情報を取得
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

    // 今日のタスクのチェックマーク
    const checkTodo = async (todo: TodoProps) => {
        try {
            const res = await fetch(`/api/todo/${todo.id}`, {
                method: 'PUT',
                body: JSON.stringify(todo),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!res.ok)
                throw new Error(
                    `APIエラー: ${(await res.json()).message || '不明なエラー'}`,
                );
            console.log('チェック更新成功');
        } catch (error) {
            console.error('チェック更新エラー:', error);
        }
    };

    // 今日のタスクの削除ボタン
    const deleteTodo = async (todo: TodoProps) => {
        try {
            const res = await fetch(`/api/todo/${todo.id}`, {
                method: 'PUT',
                body: JSON.stringify(todo),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!res.ok)
                throw new Error(
                    `APIエラー: ${(await res.json()).message || '不明なエラー'}`,
                );
            console.log('チェック更新成功');
        } catch (error) {
            console.error('チェック更新エラー:', error);
        }
    };

    useEffect(() => {
        fetchAllTodos();
    }, []);

    const toggleChecked = async (id: number, date: string) => {
        //チェックボタンを機能させる関数
        setTodos((prevTodos) => {
            return prevTodos.map((todo) => {
                if (todo.id === id) {
                    const newCheckedDates = {
                        ...todo.checkedDates,
                        [date]: !todo.checkedDates[date],
                    };
                    const contdays = CountContinueDays(newCheckedDates);

                    // 非同期でサーバーに更新リクエストを送信
                    checkTodo({
                        ...todo,
                        continuedays: contdays,
                        checkedDates: newCheckedDates,
                    });

                    return { ...todo, checkedDates: newCheckedDates };
                }
                return todo;
            });
        });
    };

    const toggleDelete = async (id: number, date: string) => {
        setTodos((prevTodos) => {
            return prevTodos.map((todo) => {
                if (todo.id === id) {
                    const arraydates = Object.entries(todo.checkedDates).filter(
                        (d) => d[0] !== date,
                    );
                    const newCheckedDates = Object.fromEntries(arraydates);

                    deleteTodo({ ...todo, checkedDates: newCheckedDates });

                    return { ...todo, checkedDates: newCheckedDates };
                }
                return todo;
            });
        });
    };

    return (
        <TodoContext.Provider
            value={{
                todos,
                setTodos,
                toggleChecked,
                fetchAllTodos,
                toggleDelete,
                loading
            }}>
            {children}
        </TodoContext.Provider>
    );
};
