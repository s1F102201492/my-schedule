import React, { useContext, useState } from 'react';
import {
    Checkbox,
    IconButton,
    ListItem,
    ListItemText,
    Tooltip,
    Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TodoContext } from '../components/TodoContext';
import { CountContinueDays } from '../components/calculate/CountContinueDays';

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

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    const todoContext = useContext(TodoContext);

    if (!todoContext) {
        throw new Error(
            'TodoContext is undefined. Make sure to use TodoProvider.',
        );
    }

    const { toggleChecked, toggleDelete } = todoContext;
    const todayslash = new Date()
        .toISOString()
        .split('T')[0]
        .replace(/-/g, '/');

    const todayDayscnt = CountContinueDays(todo.checkedDates);

    const handleCheck = async () => {
        await toggleChecked(todo.id, todayslash);
    };

    const handleDelete = async () => {
        await toggleDelete(todo.id, todayslash);
    };

    return (
        <div>
            <ListItem>
                <Checkbox
                    checked={!!todo.checkedDates[todayslash]}
                    onChange={handleCheck}
                />
                <ListItemText primary={todo.title} />
                {todayDayscnt + 1}日目
                <Tooltip title='削除'>
                    <IconButton
                        aria-label='delete'
                        onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </ListItem>
        </div>
    );
};

export default TodoItem;
