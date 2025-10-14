"use client";

import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { DateComponents } from "./DateComponents";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ja";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useRouter } from "next/navigation";
import { TodoContext } from "../context/TodoContext";
import { taglist } from "./tags";
import FullScreenLoading from "./common/fullScreenLoading";
import { EditDialogProps } from "../Models/models";
import { useTaskForm } from "../hooks/form/useTaskForm";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ja");
dayjs.tz.setDefault("Asia/Tokyo");

const Edit: React.FC<EditDialogProps> = ({ id, todo, editOpen, setEditOpen }) => {
    const router = useRouter();
    const todoContext = useContext(TodoContext);

    if (!todoContext) {
        throw new Error(
            "TodoContext is undefined. Make sure to use TodoProvider.",
        );
    }
    const { fetchAllTodo, editTodo } = todoContext;
    
    const { formState, handlers, getIntervalValue, resetForm } = useTaskForm(todo);
    const { title, description, startDate, endDate, isIntervalDays, intervalNumber, selectedWeekdays, purpose, tag } = formState;
    const { 
        handleTitleChange, handleDescriptionChange, setStartDate, setEndDate,
        handleIntervalToggle, handleIntervalNumberChange, handleWeekdaySelect,
        handlePurposeChange, handleTagChange 
    } = handlers;

    const [loading, setLoading] = useState(false);

    // フォームのクローズ
    const handleEditClose = () => {
        //閉じたらすべてリセット
        setEditOpen(false);
        resetForm();
    };

    // n日ごとの場合
    const numberofdays: number[] = [1, 2, 3, 4, 5, 6, 7];
    
    // タグの選択
    const tags = taglist;

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        try {
            setLoading(true);

            const createCheckedDates = (
                sd: Dayjs,
                ed: Dayjs,
                interval: number | string[],
            ) => {
                const objdate: Record<string, boolean> = {};
                if (typeof interval === "number") {
                    // 日ごとの場合
                    let date = sd;
                    while (dayjs(date).isBefore(dayjs(ed).add(1, "d"))) {
                        const slashdate = dayjs(date).format("YYYY/MM/DD");
                        objdate[slashdate] = false;
                        date = dayjs(date).add(interval, "d");
                    }
                    return objdate;
                } else {
                    // 曜日の場合
                    let date = sd;
                    while (dayjs(date).isBefore(dayjs(ed).add(1, "d"))) {
                        const day = dayjs(date).format("ddd");
                        if (selectedWeekdays.includes(day)) {
                            const slashdate = dayjs(date).format("YYYY/MM/DD");
                            objdate[slashdate] = false;
                        }
                        date = dayjs(date).add(1, "d");
                    }
                    return objdate;
                }
            };

            const checkdates: Record<string, boolean> = createCheckedDates(
                startDate,
                endDate,
                getIntervalValue(),
            ); // 日付: falseの辞書を作成
            const contdays = todo.continuedays; //編集なので達成日はそのまま

            await editTodo({
                id,
                title,
                description,
                continuedays: contdays,
                checkedDates: checkdates,
                startdate: startDate?.format("YYYY/MM/DD"),
                enddate: endDate?.format("YYYY/MM/DD"),
                interval: getIntervalValue(),
                purpose,
                tag,
            });

            await fetchAllTodo();
            setEditOpen(false);
            router.push("/list");
            router.refresh();
            resetForm();
        } catch {
            alert("編集ができませんでした。もう一度お試しください。");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Dialog
                fullWidth
                open={editOpen}
                onClose={handleEditClose}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle
                        sx={{ m: 1 }}
                        variant='h5'>
                        タスクや習慣を追加する
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText variant='h6'>
                            タイトル
                        </DialogContentText>
                        <TextField
                            required
                            margin='dense'
                            fullWidth
                            variant='outlined'
                            value={title}
                            onChange={handleTitleChange}
                        />
                        <DialogContentText variant='h6' sx={{ mt: 3 }}>
                            具体的にやることや現状の記録
                        </DialogContentText>
                        <TextField
                            multiline
                            rows={3}
                            margin='dense'
                            fullWidth
                            variant='outlined'
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                        <Box sx={{ flexDirection: "row" }}>
                            <DialogContentText
                                sx={{ mt: 3 }}
                                variant='h6'>
                                開始日
                            </DialogContentText>
                            <DateComponents
                                label='開始日'
                                date={startDate}
                                setDate={setStartDate}
                                minDate={dayjs(new Date("2000/01/01"))}
                                maxDate={dayjs(new Date("2299/12/31"))}
                            />
                        </Box>
                        <Box sx={{ flexDirection: "row" }}>
                            <DialogContentText
                                sx={{ mt: 3 }}
                                variant='h6'>
                                終了日
                            </DialogContentText>
                            <DateComponents
                                label='終了日'
                                date={endDate}
                                setDate={setEndDate}
                                minDate={startDate}
                                maxDate={dayjs(new Date("2299/12/31"))}
                            />
                        </Box>
                        <DialogContentText
                            sx={{ mt: 3 }}
                            variant='h6'>
                            繰り返し日
                        </DialogContentText>
                        {isIntervalDays ? "N日ごと" : "曜日"}
                        <Switch
                            checked={isIntervalDays}
                            onChange={handleIntervalToggle}
                        />
                        <Box>
                            {isIntervalDays ? (
                                <Select
                                    required
                                    labelId='demo-multiple-name-label'
                                    id='demo-multiple-name'
                                    value={intervalNumber}
                                    onChange={handleIntervalNumberChange}>
                                    {numberofdays.map((num) => (
                                        <MenuItem
                                            key={num}
                                            value={num}>
                                            {num}
                                        </MenuItem>
                                    ))}
                                </Select>
                            ) : (
                                <FormGroup row>
                                    {[
                                        "月",
                                        "火",
                                        "水",
                                        "木",
                                        "金",
                                        "土",
                                        "日",
                                    ].map((day) => (
                                        <Chip
                                            key={day}
                                            label={day}
                                            variant={
                                                selectedWeekdays.includes(day)
                                                    ? "filled"
                                                    : "outlined"
                                            }
                                            color={
                                                selectedWeekdays.includes(day)
                                                    ? "primary"
                                                    : "default"
                                            }
                                            onClick={() => handleWeekdaySelect(day)}
                                        />
                                    ))}
                                </FormGroup>
                            )}
                        </Box>
                        <DialogContentText
                            variant='h6'
                            sx={{ mt: 3 }}>目的</DialogContentText>
                        <TextField
                            multiline
                            rows={3}
                            margin='dense'
                            fullWidth
                            variant='outlined'
                            value={purpose}
                            onChange={handlePurposeChange}
                        />
                        <FormControl
                            fullWidth
                            sx={{ my: 4 }}>
                            <InputLabel id='tag-select'>タグを選択</InputLabel>
                            <Select
                                labelId='tag-select'
                                id='tag-select'
                                value={tag}
                                label='タグを選択'
                                onChange={handleTagChange}
                                MenuProps={{ PaperProps: { height: 300 } }}>
                                {tags.map((tag) => (
                                    <MenuItem
                                        key={tag}
                                        value={tag}
                                        sx={{ height: 40 }}>
                                        {tag}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditClose}>閉じる</Button>
                        <Button
                            type='submit'
                            value='submit'
                            variant='contained'>
                            編集
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* タスクの追加中はローディングを表示 */}
            {loading && <FullScreenLoading open={loading} />}
        </div>
    );
};

export default Edit;
