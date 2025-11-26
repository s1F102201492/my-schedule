"use client";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import { useRouter } from "next/navigation";
import FullScreenLoading from "./common/fullScreenLoading";
import { TodoModel, DeleteDialogProps } from "../Models/models";

/**
 * タスク削除確認用ダイアログコンポーネント
 * * 主な機能:
 * - 削除の確認メッセージ表示
 * - 削除APIの実行
 * - ローカルState（TodoList）からの即時削除反映
 * * @component
 * @param {DeleteDialogProps} props - 削除対象タスク、ダイアログ開閉状態、制御関数
 */
const Delete: React.FC<DeleteDialogProps> = ({ onetodo, deleteOpen, setDeleteOpen }) => {
    const router = useRouter();

    const todoContext = useContext(TodoContext);

    if (!todoContext) {
        throw new Error(
            "TodoContext is undefined. Make sure to use TodoProvider.",
        );
    }

    const { todos, deleteTodo, fetchAllTodo, setTodos } = todoContext;

    const [loading, setLoading] = useState(false);

    // フォームのクローズ
    const handleDeleteClose = () => {
        //閉じたらすべてリセット
        setDeleteOpen(false);
    };

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            setTodos((prevTodos) => {
                return prevTodos.filter((todo: TodoModel) => todo.id !== onetodo.id);
            });

            const targetTodo = todos.find((todo) => todo.id === onetodo.id);
            if (!targetTodo) return;

            await deleteTodo(targetTodo);

            await fetchAllTodo();
            setDeleteOpen(false);
            router.push("/list");
            router.refresh();
        } catch {
            alert("削除に失敗しました。もう一度お試しください。");
        } finally {
            setLoading(false);
        }
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

            {/* タスクの追加中はローディングを表示 */}
            {loading && <FullScreenLoading open={loading} />}
        </div>
    );
};

export default Delete;

