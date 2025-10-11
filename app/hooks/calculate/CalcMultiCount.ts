import { TodoModel } from "@/app/Models/models";

// １日の最大タスク数をカウントする関数
export const CalcMultiCount = (alltodos: TodoModel[]) => {
    const resultObj: Record<string, number> = {};

    const completedDays = alltodos.map((todo) => {
        return Object.keys(todo.checkedDates).filter((date) => {
            return todo.checkedDates[date] === true;
        });
    });

    // 二次元配列などで同じ日付のものをかためる
    for (const element of completedDays) {
        for (const day of element) {
            if (day in resultObj) {
                resultObj[day] += 1;
            } else {
                resultObj[day] = 1;
            }
        }
    }

    // 一日の最大タスク数
    let output: number = 0;
    for (const date in resultObj) {
        if (resultObj[date] > output) {
            output = resultObj[date];
        }
    }

    // それぞれの配列の長さを出す
    return output;
};
