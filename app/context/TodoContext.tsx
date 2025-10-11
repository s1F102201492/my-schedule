"use client";

import React, {
    createContext,
    ReactNode,
    useContext,
} from "react";
import FullScreenLoading from "../components/parts/fullScreenLoading";
import { TodoContextType } from "../Models/models";
import { useTodoCRUD } from "../hooks/todo/useTodoCRUD";
import { AuthContext } from "./AuthContext";

export const TodoContext = createContext<TodoContextType | undefined>(
    undefined,
);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    
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

    const { todos, setTodos, toggleChecked, fetchAllTodo, toggleDelete, loading, deleteTodo, checkTodayTodo, deleteTodayTodo, addTodo, editTodo } = useTodoCRUD();

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
