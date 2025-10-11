// このカスタムフックでは、タスクの変更を管理する（フロントで使う）
import { useCallback, useContext, useEffect, useState } from "react";
import { TodoModel as TodoModel } from "../../Models/models";
import { CountContinueDays } from "@/app/components/calculate/CountContinueDays";
import { AuthContext } from "@/app/context/AuthContext";

export const useTodoCRUD = () => {

    const [todos, setTodos] = useState<TodoModel[]>([]);
    const [loading, setLoading] = useState(true);

    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("AuthContext is undefined. Make sure to use AuthProvider.");
    }

    const { session } = authContext;

    if (!session) {
        throw new Error("Session is undefined. Make sure to use AuthProvider.");
    }

    // 習慣の取得API
    const fetchAllTodo = useCallback(async () => {
        try {
            setLoading(true);

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

    useEffect(() => {
        fetchAllTodo();
    }, []);

    // 習慣の追加API
    const addTodo = async (todo: Omit<TodoModel, "id" | "continuedays">) => {
        const {
            title,
            description,
            checkedDates,
            startdate,
            enddate,
            interval,
            purpose,
            tag,
        } = todo;
        const res = await fetch("/api/todo", {
            method: "POST",
            body: JSON.stringify({
                title,
                description,
                continuedays: 0, // 新規追加時は0
                checkedDates,
                startdate,
                enddate,
                interval,
                purpose,
                tag,
                userId: session!.user.id,
            }),
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${session!.access_token}`,
            },
        });

        return res.json();
    };

    // タスクの編集API
    const editTodo = async (todo: TodoModel) => {
        const {
            id,
            title,
            description,
            continuedays,
            checkedDates,
            startdate,
            enddate,
            interval,
            purpose,
            tag,
        } = todo;
        const res = await fetch(`/api/todo/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                id,
                title,
                description,
                continuedays,
                checkedDates,
                startdate,
                enddate,
                interval,
                purpose,
                tag,
                userId: session!.user.id,
            }),
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${session!.access_token}`,
            },
        });

        return res.json();
    };

    // タスクの削除API
    const deleteTodo = async (todo: TodoModel) => {

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
    
        return res.json();
    };

    // 今日のタスクのチェックマーク
    const checkTodayTodo = async (todo: TodoModel) => {
        try {

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
    const deleteTodayTodo = async (todo: TodoModel) => {
        try {
            
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

    //チェックボタンを機能させる関数
    const toggleChecked = async (selectedId: number, date: string) => {
        
        setTodos((prevTodos) => {
            return prevTodos.map((todo) => {
                if (todo.id === selectedId) {
                    const newCheckedDates = {
                        ...todo.checkedDates,
                        [date]: !todo.checkedDates[date],
                    };
                    const contdays = CountContinueDays(newCheckedDates);

                    // 非同期でサーバーに更新リクエストを送信
                    checkTodayTodo({
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

    // 習慣の中の指定日のタスクを削除する関数
    const deleteDate = async (selectedId: number, date: string) => {
        setTodos((prevTodos) => {
            return prevTodos.map((todo) => {
                if (todo.id === selectedId) {
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
                const newTodos: TodoModel[] = [];
                prevTodos.forEach((todo) => {
                    if (Object.keys(todo.checkedDates).length > 0) {
                        newTodos.push(todo);
                    } else {
                        deleteTodo(todo);
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


    return {
        todos,
        setTodos,
        loading,
        fetchAllTodo,
        addTodo,
        editTodo,
        deleteTodo,
        checkTodayTodo,
        deleteTodayTodo,
        toggleChecked,
        toggleDelete,
    };
}