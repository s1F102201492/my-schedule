// 今までに行ったタスク数をカウント

import { CountContinueDays } from "./CountContinueDays";

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

export const CalcAchieveCount = (alltodos: TodoProps[]) => {
    let sum = 0;
    for (const todo of alltodos) {
        sum += CountContinueDays(todo.checkedDates);
    }

    return sum;
};
