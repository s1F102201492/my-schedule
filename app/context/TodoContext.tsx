"use client";

import React, {
    createContext,
    ReactNode,
    useContext,
} from "react";
import FullScreenLoading from "../components/common/fullScreenLoading";
import { TodoContextType } from "../Models/models";
import { useTodoCRUD } from "../hooks/todo/useTodoCRUD";
import { AuthContext } from "./AuthContext";

/**
 * Todoデータをアプリケーション全体で共有するためのContextオブジェクト
 */
export const TodoContext = createContext<TodoContextType | undefined>(
    undefined,
);

/**
 * Todoコンテキストプロバイダー
 * `useTodoCRUD`フックが提供するTodoリストの状態と操作関数をコンテキストとして提供します。
 * AuthContextに依存しており、認証セッションがない場合はローディングを表示します。
 * * @component
 * @param {ReactNode} children - 子コンポーネント
 */
export const TodoProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {

    const { todos, setTodos, toggleChecked, fetchAllTodo, toggleDelete, loading, deleteTodo, checkTodayTodo, deleteTodayTodo, addTodo, editTodo } = useTodoCRUD();

    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error(
            "AuthContext is undefined. Make sure to use AuthProvider.",
        );
    }

    const { session } = authContext;

    if (!session) {
        return <FullScreenLoading open={true} />;
    }
    
    return (
        <TodoContext.Provider
            value={{
                todos,
                setTodos,
                toggleChecked,
                fetchAllTodo,
                toggleDelete,
                loading,
                addTodo,
                editTodo,
                deleteTodo,
                checkTodayTodo,
                deleteTodayTodo,
            }}>
            {children}

            {loading && <FullScreenLoading open={loading} />}
        </TodoContext.Provider>
    );
};
