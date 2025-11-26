import { useState, useContext, useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";
import { TodoContext } from "@/app/context/TodoContext";
import { CalendarTodoModel } from "@/app/Models/models";

/**
 * カレンダーUIのためのロジックを提供するカスタムフック
 * 現在の表示月、選択された日付、その日のタスクリストなどの状態を管理します。
 * * @returns {object} カレンダーの状態と操作関数
 */
export const useCalendar = () => {
    const todoContext = useContext(TodoContext);
    if (!todoContext) {
        throw new Error("TodoContext is undefined. Make sure to use TodoProvider.");
    }
    const { todos } = todoContext;

    const [current, setCurrent] = useState<Dayjs>(dayjs());
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [todayTodoList, setTodayTodoList] = useState<CalendarTodoModel[]>([]);

    // 全てのTodoのチェック履歴を展開し、カレンダー用イベント形式の配列に変換してメモ化
    const allEvents = useMemo(() => 
        todos.flatMap(todo =>
            Object.keys(todo.checkedDates).map(dateKey => ({
                title: todo.title,
                description: todo.description,
                date: dayjs(dateKey),
                completed: todo.checkedDates[dateKey],
                tag: todo.tag,
            }))
        ), [todos]);

    const nextMonth = () => setCurrent(current.add(1, "M"));
    const prevMonth = () => setCurrent(current.subtract(1, "M"));
    const resetToToday = () => setCurrent(dayjs());

    const monthStart = current.startOf("month");
    const monthEnd = current.endOf("month");
    const daysInMonth = Array.from({ length: monthEnd.date() }, (_, i) => monthStart.add(i, "d"));
    
    const weekDays = ["日", "月", "火", "水", "木", "金", "土"];

    const hasEvents = (date: Dayjs) => allEvents.some(event => event.date.isSame(date, "day"));
    
    const handleClickDate = (date: Dayjs) => {
        setSelectedDate(date);
        setTodayTodoList(allEvents.filter(event => event.date.isSame(date, "day")));
    };
    
    const firstDayOfMonth = monthStart.day();
    const lastDayOfMonth = monthEnd.day();

    return {
        current,
        selectedDate,
        todayTodoList,
        allEvents,
        daysInMonth,
        weekDays,
        actions: {
            nextMonth,
            prevMonth,
            resetToToday,
            handleClickDate,
            hasEvents
        },
        firstDayOfMonth,
        lastDayOfMonth,
    };
};
