// このカスタムフックでは、タスクの変更を管理する（フロントで使う）
import { useCallback, useContext, useEffect, useState } from "react";
import { TodoModel as TodoModel } from "../../Models/models";
import { CountContinueDays } from "@/app/hooks/calculate/CountContinueDays";
import { AuthContext } from "@/app/context/AuthContext";

/**
 * タスク（Todo）のCRUD操作を提供するカスタムフック
 * APIとの通信を行い、タスクの取得、追加、更新、削除、チェック状態の変更を管理します。
 * * @returns {object} Todoリストの状態と操作関数群
 */
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

    /**
     * 全ての習慣（Todo）を取得するAPI呼び出し
     */
    const fetchAllTodo = useCallback(async () => {
        try {
            setLoading(true);

            if (!session?.access_token) {
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
        } catch {
            // エラーハンドリング
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAllTodo();
    }, []);

    /**
     * 新しい習慣を追加する
     * @param {Omit<TodoModel, "id" | "continuedays">} todo - 追加するTodoデータ
     */
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

    /**
     * タスクの内容を編集する
     */
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

    /**
     * タスクを完全に削除する
     */
    const deleteTodo = async (todo: TodoModel) => {

        if (!session?.access_token) {
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

    /**
     * 今日のタスクのチェック状態をAPIへ同期する
     */
    const checkTodayTodo = async (todo: TodoModel) => {
        try {

            if (!session?.access_token) {
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
        } catch {
            // エラーハンドリング
        }
    };

    /**
     * 今日のタスク一覧から削除ボタンを押した時の処理
     */
    const deleteTodayTodo = async (todo: TodoModel) => {
        try {
            
            if (!session?.access_token) {
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
        } catch {
            // エラーハンドリング
        }
    };

    /**
     * チェックボタンをトグル（ON/OFF切り替え）する
     * ローカルの状態を即座に更新し、非同期でAPIへ同期します。
     * @param {number} selectedId - 対象のTodo ID
     * @param {string} date - チェックする日付文字列
     */
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

    /**
     * 習慣の中から指定日のチェック履歴データのみを削除する
     */
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

    /**
     * チェック履歴（checkedDates）が空になったタスクを削除する
     */
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

    /**
     * 日付指定の削除と、空タスクの削除をまとめて実行する
     */
    const toggleDelete = async (id: number, date: string) => {
        await Promise.all([deleteDate(id, date), deleteZeroDate()])
            .then(() => {
                // 削除成功
            })
            .catch(() => {
                // 削除失敗
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