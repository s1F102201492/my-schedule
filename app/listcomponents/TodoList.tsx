import React, { useContext, useEffect, useRef, useState } from 'react';
import TodoItem from './TodoItem';
import TodoChecked from './TodoChecked';
import { List, Typography } from '@mui/material';
import { ChangeSlashDay } from '../components/calculate/ChangeSlashDay';
import { TodoContext } from '../context/TodoContext';
import RewardDialog from '../components/RewardDialog';

interface TodoProps {
    id: number;
    title: string;
    description: string;
    continuedays: number;
    checkedDates: Record<string, boolean>;
    startdate: string;
    enddate: string;
    interval: number | string[];
    purpose: string;
    tag: string;
}

const TodoList = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const todoContext = useContext(TodoContext);

    if (!todoContext) {
        throw new Error(
            'TodoContext is undefined. Make sure to use TodoProvider.',
        );
    }

    const { todos } = todoContext;

    const todayDay: string = new Date().toLocaleDateString('ja-JP', {
        weekday: 'short',
    }); //今日の曜日

    const todayslash: string = ChangeSlashDay(today); //今日の日付("yyyy/mm/dd"型)

    const todaytodos: TodoProps[] = todos.filter((todo) => {
        // すべてのタスク開始日と終了日の範囲に今日が入っていたら抽出
        const isWithinDateRange: boolean =
            todayslash >= ChangeSlashDay(new Date(todo.startdate)) &&
            todayslash <= ChangeSlashDay(new Date(todo.enddate));

        if (isWithinDateRange) {
            if (Array.isArray(todo.interval)) {
                // intervalが曜日の配列の場合
                return todo.interval.includes(todayDay);
            } else if (typeof todo.interval === 'number') {
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

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (!notchecktodos.length && !reward) {
            setReward(true);
        }
    }, [notchecktodos.length]);


        

    return (
        <div>
            {/* 完了していないリスト */}
            <Typography
                variant='h6'
                fontFamily='Monospace'
                component='div'
                sx={{ m: 4 }}>
                {`${year}年${month}月${day}日`}のやることリスト
            </Typography>
            <List
                sx={{ width: '100%', maxWidth: 500 }}
                disablePadding>
                {notchecktodos.map((todo: TodoProps) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                    />
                ))}
            </List>
            <br />

            {/* 完了してしたリスト、うすくする */}
            <Typography
                variant='h6'
                m={4}>
                完了したリスト
            </Typography>
            <List
                sx={{ width: '100%', maxWidth: 500 }}
                disablePadding>
                {checkedtodos.map((todo: TodoProps) => (
                    <TodoChecked
                        key={todo.id}
                        todo={todo}
                    />
                ))}
            </List>

            {reward && <RewardDialog open={reward} setOpen={setReward} />}
        </div>
    );
};

export default TodoList;
