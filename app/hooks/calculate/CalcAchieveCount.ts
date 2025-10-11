// 今までに行ったタスク数をカウント

import { TodoModel } from "@/app/Models/models";
import { CountContinueDays } from "./CountContinueDays";

export const CalcAchieveCount = (alltodos: TodoModel[]) => {
    let sum = 0;
    for (const todo of alltodos) {
        sum += CountContinueDays(todo.checkedDates);
    }

    return sum;
};
