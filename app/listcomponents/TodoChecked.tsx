import { Checkbox, ListItem, ListItemText } from "@mui/material";
import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { CountContinueDays } from "../components/calculate/CountContinueDays";

interface TodoProps {
    id: number;
    title: string;
    description: string;
    continuedays: number;
    checkedDates: Record<string, boolean>;
    startdate: string;
    enddate: string;
    interval: number | string[];
    // intervalには数字か配列（曜日を格納する）
}

interface TodoItemProps {
    todo: TodoProps;
}

const TodoChecked: React.FC<TodoItemProps> = ({ todo }) => {
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
                <ListItemText primary={todo.title} />
                {todayDayscnt}日目
            </ListItem>
        </div>
    );
};

export default TodoChecked;
