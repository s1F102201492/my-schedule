import React from 'react';
import TodoItem from './TodoItem';
import TodoChecked from './TodoChecked';
import { List, Typography } from '@mui/material';
import { ChangeSlashDay } from '../components/calculate/ChangeSlashDay';

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

interface TodoListProps {
    todos: TodoProps[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
    const todayDay: string = new Date().toLocaleDateString('ja-JP', {
        weekday: 'short',
    }); //今日の曜日
    const today: Date = new Date(); //今日の日付(Date型)

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

    return (
        <div>
            {/* 完了していないリスト */}
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
                m={2}>
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
        </div>
    );
};

export default TodoList;
