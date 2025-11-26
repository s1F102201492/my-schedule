// タスク一つ一つを日付ごとに並べる関数

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { TodoModel } from "@/app/Models/models";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ja");
dayjs.tz.setDefault("Asia/Tokyo");

/**
 * タスクの `checkedDates` を展開し、カレンダー等で表示しやすい形式のフラットな配列に変換する関数
 * 各タスクの日付ごとの状態を個別のオブジェクトとして生成します。
 * * @param {TodoModel[]} alltodos - 全てのタスクの配列
 * @returns {Array} カレンダー表示用に整形されたオブジェクトの配列
 * * @example
 * const todos = [{
 * title: "運動",
 * description: "ジム",
 * tag: "健康",
 * checkedDates: { "2023/01/01": true }
 * }];
 * const events = ChangeTodayTodos(todos);
 * // [
 * //   {
 * //     title: "運動",
 * //     description: "ジム",
 * //     date: Dayjs("2023/01/01"),
 * //     completed: true,
 * //     tag: "健康"
 * //   }
 * // ]
 */
export const ChangeTodayTodos = (alltodos: TodoModel[]) => {
    const todayTodos = alltodos.flatMap((todo) =>
        Object.keys(todo.checkedDates).map((dateKey) => ({
            title: todo.title,
            description: todo.description,
            date: dayjs(dateKey),
            completed: todo.checkedDates[dateKey],
            tag: todo.tag,
        })),
    );

    return todayTodos;
};
