import { Checkbox, ListItem, ListItemText } from "@mui/material";
import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { CountContinueDays } from "../hooks/calculate/CountContinueDays";
import { TodoModel } from "../Models/models";

const TodoChecked = ({ todo }: {todo: TodoModel}) => {
    const todoContext = useContext(TodoContext);

    if (!todoContext) {
        throw new Error(
            "TodoContext is undefined. Make sure to use TodoProvider.",
        );
    }

    const { toggleChecked } = todoContext;
    const todayslash = new Date()
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "/");

    const todayDayscnt = CountContinueDays(todo.checkedDates);

    const handleCheck = async () => {
        await toggleChecked(todo.id, todayslash);
    };

    return (
        <div style={{ opacity: 0.4 }}>
            <ListItem>
                <Checkbox
                    checked={!!todo.checkedDates[todayslash]}
                    onChange={handleCheck}
                />
                <ListItemText
                sx={{
                    width: 120,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    'WebkitBoxOrient': 'vertical',
                    'WebkitLineClamp': '1', }}
                primary={todo.title} />
                {todayDayscnt}日目
            </ListItem>
        </div>
    );
};

export default TodoChecked;
