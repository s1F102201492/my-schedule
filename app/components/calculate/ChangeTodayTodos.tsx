// タスク一つ一つを日付ごとに並べる関数

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ja");
dayjs.tz.setDefault("Asia/Tokyo");

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

export const ChangeTodayTodos = (alltodos: TodoProps[]) => {
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
