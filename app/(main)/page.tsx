"use client";

import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import TodoList from "../listcomponents/TodoList";
import { AuthContext } from "../context/AuthContext";
import { Box } from "@mui/material";

export default function Home() {
    const todoContext = useContext(TodoContext);

    if (!todoContext) {
        throw new Error(
            "TodoContext is undefined. Make sure to use TodoProvider.",
        );
    }

    const { loading } = todoContext;

    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error(
            "TodoContext is undefined. Make sure to use TodoProvider.",
        );
    }

    const { loginUser } = authContext;
    console.log(loginUser);

    return (
        <div>

            <TodoList />
            <Box sx={{ m: 4 }}></Box>
        </div>
    );
}
