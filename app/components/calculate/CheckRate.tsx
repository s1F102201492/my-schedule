// 達成率を計算する関数

'use client';

interface TodoProps {
    id: number;
    title: string;
    description: string;
    continuedays: number;
    checkedDates: Record<string, boolean>;
    startdate: string;
    enddate: string;
    interval: number | string[];
    color: string;
    // intervalには数字か配列（曜日を格納する）
}

export const CheckRate = (todo: TodoProps): number => {
    const checkcount = todo.continuedays;
    const totalcount = Object.keys(todo.checkedDates).length;
    return Math.round((checkcount / totalcount) * 1000) / 10;
};
