// 達成率を計算する関数

import { TodoModel } from "@/app/Models/models";

export const CheckRate = (todo: TodoModel): number => {
    const checkcount = todo.continuedays;
    const totalcount = Object.keys(todo.checkedDates).length;

    if (Object.keys(todo.checkedDates).length > 0) {
        return Math.round((checkcount / totalcount) * 1000) / 10;
    } else {
        return 0;
    }
};
