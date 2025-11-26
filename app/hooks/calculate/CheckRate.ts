import { TodoModel } from "@/app/Models/models";

/**
 * 単一のタスクの達成率（%）を計算する関数
 * 小数点第一位まで計算します。
 * * @param {TodoModel} todo - 計算対象のタスク
 * @returns {number} 達成率（%）
 * * @example
 * const todo = {
 * continuedays: 3, // 達成済み日数（checkedDates内のtrueの数と一致前提）
 * checkedDates: { "d1": true, "d2": true, "d3": true, "d4": false, "d5": false } // 全5日
 * } as TodoModel;
 * * const rate = CheckRate(todo); // 60 (3/5 * 100)
 */
export const CheckRate = (todo: TodoModel): number => {
    const checkcount = todo.continuedays;
    const totalcount = Object.keys(todo.checkedDates).length;

    if (Object.keys(todo.checkedDates).length > 0) {
        return Math.round((checkcount / totalcount) * 1000) / 10;
    } else {
        return 0;
    }
};
