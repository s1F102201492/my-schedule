import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { TodoModel } from "@/app/Models/models";
import { SelectChangeEvent } from "@mui/material";

export const useTaskForm = (initialTodo?: TodoModel) => {
    const [title, setTitle] = useState(initialTodo?.title || "");
    const [description, setDescription] = useState(initialTodo?.description || "");
    const [startDate, setStartDate] = useState<Dayjs>(initialTodo ? dayjs(initialTodo.startdate) : dayjs());
    const [endDate, setEndDate] = useState<Dayjs>(initialTodo ? dayjs(initialTodo.enddate) : dayjs());

    // intervalが数値か配列かを判断
    const [isIntervalDays, setIsIntervalDays] = useState(
        initialTodo ? typeof initialTodo.interval === "number" : true
    );
    // intervalが日数の場合
    const [intervalNumber, setIntervalNumber] = useState(
        initialTodo && typeof initialTodo.interval === "number" ? initialTodo.interval : 1
    );
    // intervalが曜日の場合
    const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>(
        initialTodo && Array.isArray(initialTodo.interval) ? initialTodo.interval : []
    );
    const [purpose, setPurpose] = useState(initialTodo?.purpose || "");
    const [tag, setTag] = useState(initialTodo?.tag || "");

    useEffect(() => {
        if (initialTodo) {
            setTitle(initialTodo.title);
            setDescription(initialTodo.description);
            setStartDate(dayjs(initialTodo.startdate));
            setEndDate(dayjs(initialTodo.enddate));
            const isDays = typeof initialTodo.interval === "number";
            setIsIntervalDays(isDays);
            if (isDays) {
                setIntervalNumber(initialTodo.interval as number);
                setSelectedWeekdays([]);
            } else {
                setSelectedWeekdays(initialTodo.interval as string[]);
                setIntervalNumber(1);
            }
            setPurpose(initialTodo.purpose);
            setTag(initialTodo.tag);
        }
    }, [initialTodo]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);
    const handlePurposeChange = (e: React.ChangeEvent<HTMLInputElement>) => setPurpose(e.target.value);
    const handleTagChange = (e: SelectChangeEvent) => setTag(e.target.value as string);
    const handleIntervalToggle = () => setIsIntervalDays(!isIntervalDays);
    const handleIntervalNumberChange = (e: SelectChangeEvent<number>) => setIntervalNumber(Number(e.target.value));
    const handleWeekdaySelect = (day: string) => {
        setSelectedWeekdays(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    };

    const getIntervalValue = () => isIntervalDays ? intervalNumber : selectedWeekdays;
    
    const resetForm = () => {
        setTitle("");
        setDescription("");
        setStartDate(dayjs());
        setEndDate(dayjs());
        setIsIntervalDays(true);
        setIntervalNumber(1);
        setSelectedWeekdays([]);
        setPurpose("");
        setTag("");
    }

    return {
        formState: {
            title,
            description,
            startDate,
            endDate,
            isIntervalDays,
            intervalNumber,
            selectedWeekdays,
            purpose,
            tag,
        },
        handlers: {
            handleTitleChange,
            handleDescriptionChange,
            setStartDate,
            setEndDate,
            handleIntervalToggle,
            handleIntervalNumberChange,
            handleWeekdaySelect,
            handlePurposeChange,
            handleTagChange,
        },
        getIntervalValue,
        resetForm
    };
};
