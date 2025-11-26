import { Checkbox, ListItem, ListItemText } from "@mui/material";
import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { CountContinueDays } from "../hooks/calculate/CountContinueDays";
import { TodoModel } from "../Models/models";

/**
 * 今日のやることリストに表示する「完了済みタスク」の単一コンポーネント
 * 視覚的に区別するため、全体を半透明（opacity: 0.4）で表示します。
 * * 主な機能:
 * - 完了状態の解除（チェックを外す）
 * - 達成済み日数の表示
 * * @component
 * @param {TodoModel} todo - 表示するタスクデータ
 */
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
