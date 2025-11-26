import { ContributionData, TodoModel } from "@/app/Models/models";
import dayjs from "dayjs";

/**
 * タスクデータからコントリビューショングラフ用のデータ形式に変換するコンポーネント（関数）
 * 各日付ごとのタスク達成数を集計します。
 * * @param {TodoModel[]} todos - 全タスクデータ
 * @returns {Array<{ date: string, count: number }>} 日付とカウントを持つオブジェクトの配列
 * * @example
 * // 入力: [{ checkedDates: { "2023/01/01": true } }, { checkedDates: { "2023/01/01": true } }]
 * // 出力: [{ date: "2023-01-01", count: 2 }]
 */
export const ChangeContributionData = (alltodos: TodoModel[]) => {

    const setCompleted = new Set<string>()
    const changedData: ContributionData[] = []

    // タスクを日ごとに
    const oneDayData = alltodos.flatMap((todo) =>
        Object.keys(todo.checkedDates).map((dateKey) => ({
            title: todo.title,
            date: dayjs(dateKey),
            completed: todo.checkedDates[dateKey],
        }))
    );

    oneDayData.map(data => {
        if (data.completed) {
            setCompleted.add(data.date.format("YYYY-MM-DD"))
        }
    })

    for (const date of setCompleted) {
        let count = 0;

        oneDayData.map(data => {
            if (date == data.date.format("YYYY-MM-DD")) {
                count += 1;
            }
        })

        changedData.push({day: date, value: count})
    }

  return changedData;
}
