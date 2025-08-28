import { ContributionData, TodoModel } from "@/app/Models/models";
import dayjs from "dayjs";

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
