import { TodoModel } from "@/app/Models/models";
import { CountContinueDays } from "./CountContinueDays";

/**
 * 全タスクの合計達成日数を計算する関数
 * 登録されているすべてのタスクについて、完了（true）になっている日数を合計します。
 * * @param {TodoModel[]} alltodos - 全てのタスクの配列
 * @returns {number} 全タスクの達成日数の合計値
 * * @example
 * const todos = [
 * { checkedDates: { "2023/01/01": true, "2023/01/02": false } }, // 1日達成
 * { checkedDates: { "2023/01/01": true, "2023/01/03": true } }   // 2日達成
 * ];
 * const total = CalcAchieveCount(todos); // 3
 */
export const CalcAchieveCount = (alltodos: TodoModel[]) => {
    let sum = 0;
    for (const todo of alltodos) {
        sum += CountContinueDays(todo.checkedDates);
    }

    return sum;
};
