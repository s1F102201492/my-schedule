'use client';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { TodoContext } from './TodoContext';
import { useRouter } from 'next/navigation';

interface oneTodo {
    onetodo: TodoProps;
    deleteOpen: boolean;
    setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TodoProps {
    id: number;
    title: string;
    description: string | null;
    continuedays: number;
    checkedDates: Record<string, boolean>;
    startdate: string;
    enddate: string;
    interval: number | string[];
    color: string;
}

const deleteTodo = async (todo: TodoProps) => {
    const res = await fetch(`/api/todo/${todo.id}`, {
        method: 'DELETE',
        body: JSON.stringify({ todo }),
        headers: {
            'Content-type': 'application/json',
        },
    });

    return res.json();
};

const Delete: React.FC<oneTodo> = ({ onetodo, deleteOpen, setDeleteOpen }) => {
    const router = useRouter();

    const todoContext = useContext(TodoContext);

    if (!todoContext) {
        throw new Error(
            'TodoContext is undefined. Make sure to use TodoProvider.',
        );
    }

    const { todos, setTodos, fetchAllTodos } = todoContext;

    // フォームのクローズ
    const handleDeleteClose = () => {
        //閉じたらすべてリセット
        setDeleteOpen(false);
    };

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();

        setTodos((prevTodos) => {
            return prevTodos.filter((todo) => todo.id !== onetodo.id);
        });

        const targetTodo = todos.find((todo) => todo.id === onetodo.id);
        if (!targetTodo) return;

        await deleteTodo(targetTodo);

        await fetchAllTodos();
        setDeleteOpen(false);
        router.push('/list');
        router.refresh();
    };

    return (
        <div>
            <Dialog
                fullWidth
                open={deleteOpen}
                onClose={handleDeleteClose}>
                <form onSubmit={handleDelete}>
                    <DialogTitle
                        sx={{ m: 1 }}
                        variant='h4'>
                        本当に削除しますか？
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText variant='h6'>
                            タイトル名：{onetodo.title}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteClose}>戻る</Button>
                        <Button
                            type='submit'
                            value='submit'
                            variant='contained'
                            color='error'>
                            削除
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default Delete;
