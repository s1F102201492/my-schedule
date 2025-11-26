import React, { useContext, useEffect, useRef, useState } from "react";
import TodoItem from "./TodoItem";
import TodoChecked from "./TodoChecked";
import { List, Typography } from "@mui/material";
import { ChangeSlashDay } from "../hooks/calculate/ChangeSlashDay";
import { TodoContext } from "../context/TodoContext";
import RewardDialog from "../components/RewardDialog";
import { TodoModel } from "../Models/models";

/**
 * 「今日のやることリスト」を表示するコンポーネント
 * 登録された全タスクの中から、日付や頻度（interval）に基づいて今日実施すべきタスクを抽出します。
 * 未完了タスクと完了済みタスクを分けて表示し、全て完了するとお祝いダイアログを表示します。
 * @component
 */
const TodoList = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const todoContext = useContext(TodoContext);

    if (!todoContext) {
        throw new Error(
            "TodoContext is undefined. Make sure to use TodoProvider.",
        );
    }

    const { todos } = todoContext;

    const todayDay: string = new Date().toLocaleDateString("ja-JP", {
        weekday: "short",
    }); //今日の曜日

    const todayslash: string = ChangeSlashDay(today); //今日の日付("yyyy/mm/dd"型)

    const todaytodos: TodoModel[] = todos.filter((todo) => {
        // すべてのタスク開始日と終了日の範囲に今日が入っていたら抽出
        const isWithinDateRange: boolean =
            todayslash >= ChangeSlashDay(new Date(todo.startdate)) &&
            todayslash <= ChangeSlashDay(new Date(todo.enddate));

        if (isWithinDateRange) {
            if (Array.isArray(todo.interval)) {
                // intervalが曜日の配列の場合
                return todo.interval.includes(todayDay);
            } else if (typeof todo.interval === "number") {
                // intervalが数字の日数の場合
                const startDate = new Date(todo.startdate);
                const diffInDays = Math.floor(
                    (today.getTime() - startDate.getTime()) /
                        (1000 * 60 * 60 * 24),
                );
                return diffInDays % todo.interval === 0;
            }
        }

        return false;
    });

    const notchecktodos = todaytodos.filter(
        (todo) => todo.checkedDates[todayslash] == false,
    );

    const checkedtodos = todaytodos.filter(
        (todo) => todo.checkedDates[todayslash] == true,
    );

    // お祝いのアニメーションを管理
    const [reward, setReward] = useState<boolean>(false);
    const isFirstRender = useRef(true); // 初回レンダリングを判定
    const hasShownReward = useRef(false); // 今日既にrewardを表示したかどうか

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (!notchecktodos.length && !hasShownReward.current) {
            setReward(true);
            hasShownReward.current = true; // 表示済みフラグを立てる
        }
    }, [notchecktodos.length]);

    return (
        <div>
            {/* 完了していないリスト */}
            <Typography
                variant='h6'
                component='div'
                sx={{ m: 4 }}>
                {`${year}年${month}月${day}日`}のやることリスト
            </Typography>
            {notchecktodos.length === 0 ?
                <Typography
                    variant='caption'
                    sx={{ 
                        ml: {xs: 4, sm: 16 },
                        my: {xs: 4, sm: 8},
                        opacity: 0.5,
                        display: 'block' }}>
                    今日のタスクは終了しました！お疲れ様です！
                </Typography>
                :
                <List
                    sx={{ width: "100%", maxWidth: 550 }}
                    disablePadding>
                    {notchecktodos.map((todo: TodoModel) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                        />
                    ))}
                </List>}
            <br />

            {/* 完了してしたリスト、うすくする */}
            <Typography
                variant='h6'
                sx={{ m: 4 }}>
                完了したリスト
            </Typography>
            {checkedtodos.length === 0 ?
                <Typography
                    variant='caption'
                    sx={{ 
                        ml: {xs: 4, sm: 16 },
                        my: {xs: 4, sm: 8},
                        opacity: 0.5,
                        display: 'block' }}>
                    完了されたタスクはありません！
                </Typography>
                :
                <List
                    sx={{ width: "100%", maxWidth: 510 }}
                    disablePadding>
                    {checkedtodos.map((todo: TodoModel) => (
                        <TodoChecked
                            key={todo.id}
                            todo={todo}
                        />
                    ))}
                </List>}
            

            {reward && (
                <RewardDialog
                    open={reward}
                    setOpen={setReward}
                />
            )}
        </div>
    );
};

export default TodoList;
