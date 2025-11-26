import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { TodoModel } from "@/app/Models/models";
import { SelectChangeEvent } from "@mui/material";

// バリデーションエラーの型定義
export type ValidationErrors = {
    title: string;
    description: string;
    dates: string;
    weekdays: string;
    purpose: string;
    tag: string;
};

/**
 * タスク追加・編集フォームの状態管理とバリデーションを行うカスタムフック
 * * @param {TodoModel} [initialTodo] - 編集時の初期値（新規作成時はundefined）
 * @returns {object} フォームの状態、ハンドラー、エラー情報、バリデーション関数など
 */
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

    // バリデーションエラーの状態管理
    const [errors, setErrors] = useState<ValidationErrors>({
        title: "",
        description: "",
        dates: "",
        weekdays: "",
        purpose: "",
        tag: "",
    });

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

    /**
     * 曜日の選択を切り替える
     * 既に選択されていれば解除、されていなければ追加する
     */
    const getIntervalValue = () => isIntervalDays ? intervalNumber : selectedWeekdays;
    
    /**
     * フォームの入力値を検証する
     * @returns {boolean} バリデーションに通過したかどうか
     */
    const validateForm = (): boolean => {
        const newErrors: ValidationErrors = {
            title: "",
            description: "",
            dates: "",
            weekdays: "",
            purpose: "",
            tag: "",
        };
        let isValid = true;

        // 1. タイトルのバリデーション
        if (title.trim().length === 0) {
            newErrors.title = "タイトルを入力してください";
            isValid = false;
        } else if (title.length > 50) {
            newErrors.title = "タイトルは50文字以内で入力してください";
            isValid = false;
        } else {
            // 9. 特殊文字のチェック（タイトル）
            const invalidChars = /[<>]/;
            if (invalidChars.test(title)) {
                newErrors.title = "使用できない文字が含まれています（<、>は使用できません）";
                isValid = false;
            }
        }

        // 2. 説明の文字数制限
        if (description.length > 500) {
            newErrors.description = "説明は500文字以内で入力してください";
            isValid = false;
        } else {
            // 9. 特殊文字のチェック（説明）
            const invalidChars = /[<>]/;
            if (invalidChars.test(description)) {
                newErrors.description = "使用できない文字が含まれています（<、>は使用できません）";
                isValid = false;
            }
        }

        // 3. 開始日・終了日の必須チェック
        if (!startDate || !endDate) {
            newErrors.dates = "開始日と終了日を選択してください";
            isValid = false;
        } else {
            // 4. 日付の論理的妥当性チェック
            if (startDate.isAfter(endDate)) {
                newErrors.dates = "終了日は開始日より後の日付を選択してください";
                isValid = false;
            }
        }

        // 5. 曜日選択時の最低1つ選択チェック
        if (!isIntervalDays && selectedWeekdays.length === 0) {
            newErrors.weekdays = "少なくとも1つの曜日を選択してください";
            isValid = false;
        }

        // 6. 目的の文字数制限
        if (purpose.length > 300) {
            newErrors.purpose = "目的は300文字以内で入力してください";
            isValid = false;
        }

        // 8. タグの必須チェック
        if (!tag || tag === "") {
            newErrors.tag = "タグを選択してください";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };
    
    /**
     * フォームの状態を初期化する
     */
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
        setErrors({
            title: "",
            description: "",
            dates: "",
            weekdays: "",
            purpose: "",
            tag: "",
        });
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
        errors,
        validateForm,
        getIntervalValue,
        resetForm
    };
};
