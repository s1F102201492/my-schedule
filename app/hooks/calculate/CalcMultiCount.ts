import { TodoModel } from "@/app/Models/models";

/**
 * 1日あたりの最大達成タスク数を計算する関数
 * 過去の記録の中で、最も多くタスクを完了させた日の完了数を返します。
 * * @param {TodoModel[]} alltodos - 全てのタスクの配列
 * @returns {number} 1日で達成したタスクの最大数
 * * @example
 * const todos = [
 * { checkedDates: { "2023/01/01": true, "2023/01/02": true } },
 * { checkedDates: { "2023/01/01": true, "2023/01/02": false } },
 * { checkedDates: { "2023/01/01": true, "2023/01/02": false } }
 * ];
 * // 1/1: 3つ完了
 * // 1/2: 1つ完了
 * // 最大は 3
 * const maxCount = CalcMultiCount(todos); // 3
 */
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
