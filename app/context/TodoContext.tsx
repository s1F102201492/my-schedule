"use client";

import React, {
    createContext,
    useState,
    ReactNode,
    useEffect,
    useContext,
    useCallback,
    useMemo,
} from "react";
import { CountContinueDays } from "../components/calculate/CountContinueDays";
import { createClient } from "@/utils/supabase/client";
import FullScreenLoading from "../components/parts/fullScreenLoading";

interface TodoProps {
    id: number;
    title: string;
    description: string;
    continuedays: number;
    checkedDates: Record<string, boolean>;
    startdate: string;
    enddate: string;
    interval: number | string[];
    purpose: string;
    tag: string;
}

interface TodoContextType {
    todos: TodoProps[];
    setTodos: React.Dispatch<React.SetStateAction<TodoProps[]>>;
    toggleChecked: (id: number, date: string) => Promise<void>;
    fetchAllTodos: () => Promise<void>;
    toggleDelete: (id: number, date: string) => Promise<void>;
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

    const fetchAllTodos = useCallback(async () => {
        try {
            setLoading(true);

            const supabase = createClient();
            const {
                data: { session },
            } = await supabase.auth.getSession();

            console.log(session);
            if (!session?.access_token) {
                console.error("アクセストークンが取得できませんでした");
                return;
            }

            const res = await fetch("/api/todo", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.access_token}`,
                },
                cache: "no-store",
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            setTodos(data.alltodos);
        } catch (error) {
            console.error("データの取得に失敗しました:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // 今日のタスクのチェックマーク
    const checkTodo = async (todo: TodoProps) => {
        try {
            const supabase = createClient();
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (!session?.access_token) {
                console.error("アクセストークンが取得できませんでした");
                return;
            }

            const res = await fetch(`/api/todo/${todo.id}`, {
                method: "PUT",
                body: JSON.stringify(todo),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.access_token}`,
                },
            });

            if (!res.ok)
                throw new Error(
                    `APIエラー: ${(await res.json()).message || "不明なエラー"}`,
                );
            console.log("チェック更新成功");
        } catch (err) {
            if (err instanceof Error) {
                console.log("Error: ", err.stack);
            }
        }
    };

    // 今日のタスクの削除ボタン
    const deleteTodo = async (todo: TodoProps) => {
        try {
            const supabase = createClient();
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (!session?.access_token) {
                console.error("アクセストークンが取得できませんでした");
                return;
            }

            const res = await fetch(`/api/todo/${todo.id}`, {
                method: "PUT",
                body: JSON.stringify(todo),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.access_token}`,
                },
            });

            if (!res.ok)
                throw new Error(
                    `APIエラー: ${(await res.json()).message || "不明なエラー"}`,
                );
            console.log("チェック更新成功");
        } catch (err) {
            if (err instanceof Error) {
                console.log("Error: ", err.stack);
            }
        }
    };

    // 習慣自体を削除(checkedDateが空のときに実行)
    const deletePractice = async (todo: TodoProps) => {
        try {
            const supabase = createClient();
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (!session?.access_token) {
                console.error("アクセストークンが取得できませんでした");
                return;
            }

            const res = await fetch(`/api/todo/${todo.id}`, {
                method: "DELETE",
                body: JSON.stringify(todo),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.access_token}`,
                },
            });

            if (!res.ok)
                throw new Error(
                    `APIエラー: ${(await res.json()).message || "不明なエラー"}`,
                );
            console.log("チェック更新成功");
        } catch (err) {
            if (err instanceof Error) {
                console.log("Error: ", err.stack);
            }
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

    //今日のタスクを削除する関数
    const deleteDate = async (id: number, date: string) => {
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

    // checkedDatesの中の要素が一つもない場合に削除する関数
    const deleteZeroDate = async () => {
        setTimeout(() => {
            setTodos((prevTodos) => {
                const newTodos: TodoProps[] = [];
                prevTodos.forEach((todo) => {
                    if (Object.keys(todo.checkedDates).length > 0) {
                        newTodos.push(todo);
                    } else {
                        deletePractice(todo);
                    }
                });
                return newTodos;
            });
        }, 1000);
    };

    // 上の二つの関数をまとめたもの
    const toggleDelete = async (id: number, date: string) => {
        await Promise.all([deleteDate(id, date), deleteZeroDate()])
            .then(() => {
                console.log("削除成功！");
            })
            .catch(() => {
                console.log("削除失敗");
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
                loading,
            }}>
            {children}

            {loading && <FullScreenLoading open={loading} />}
        </TodoContext.Provider>
    );
};
