"use client";

import React, { useContext, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Chip,
    FormControl,
    FormGroup,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import AutoAwesomeSharpIcon from '@mui/icons-material/AutoAwesomeSharp';
import { DateComponents } from "../DateComponents";
import { TodoContext } from "../../context/TodoContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useRouter } from "next/navigation";
import CreateCheckedDates from "../../hooks/calculate/CreateCheckedDates";
import { taglist } from "../tags";
import FullScreenLoading from "../common/fullScreenLoading";
import { AddTaskPageSwitchProps } from "../../Models/models";
import { useTaskForm } from "@/app/hooks/form/useTaskForm";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ja");
dayjs.tz.setDefault("Asia/Tokyo");

const SelfAddForm: React.FC<AddTaskPageSwitchProps> = ({ handleBoolRecomPage }) => {
    const router = useRouter();
    const todoContext = useContext(TodoContext);

    if (!todoContext) {
        throw new Error(
            "TodoContext is undefined. Make sure to use TodoProvider.",
        );
    }
    const { fetchAllTodo, addTodo } = todoContext;
    
    const { formState, handlers, errors, validateForm, getIntervalValue, resetForm } = useTaskForm();
    const { title, description, startDate, endDate, isIntervalDays, intervalNumber, selectedWeekdays, purpose, tag } = formState;
    const { 
        handleTitleChange, handleDescriptionChange, setStartDate, setEndDate,
        handleIntervalToggle, handleIntervalNumberChange, handleWeekdaySelect,
        handlePurposeChange, handleTagChange 
    } = handlers;

    // タスクの追加中はローディングを表示
    const [loading, setLoading] = useState(false);
    
    // n日ごとの場合
    const numberofdays: number[] = [1, 2, 3, 4, 5, 6, 7];

    // タグの選択
    const tags = taglist;

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        // バリデーションチェック
        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);

            const checkdates: Record<string, boolean> = CreateCheckedDates(
                startDate,
                endDate,
                getIntervalValue(),
                selectedWeekdays,
            );

            await addTodo({
                title,
                description,
                checkedDates: checkdates,
                continuedays: 0,
                startdate: startDate?.format("YYYY/MM/DD"),
                enddate: endDate?.format("YYYY/MM/DD"),
                interval: getIntervalValue(),
                purpose,
                tag,
            });

            await fetchAllTodo();
            router.push("/list");
            router.refresh();

            setTimeout(() => {
                resetForm();
            }, 1000);
        } catch {
            alert("タスクの追加に失敗しました。もう一度お試しください。");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Box sx={{ mx: 4, mt: 4, mb: 16 }}>
                <form onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                        <Typography variant='h5'>
                            タスクや習慣を追加する
                        </Typography>

                        {/* PC用タイトル */}
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Button onClick={() => handleBoolRecomPage()}>
                                自分でタスクを追加する
                            </Button>
                        </Box>

                        {/* モバイル用タイトル */}
                        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                            <Tooltip title='おすすめの習慣を提示してもらう'>
                                <IconButton onClick={() => handleBoolRecomPage()}>
                                    <AutoAwesomeSharpIcon color="primary" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <Typography variant='h6'>タイトル</Typography>
                        <TextField
                            margin='dense'
                            fullWidth
                            variant='outlined'
                            value={title}
                            onChange={handleTitleChange}
                            error={!!errors.title}
                            helperText={errors.title}
                        />
                        <Typography variant='h6' sx={{ mt: 3 }}>
                            具体的にやることや現状の記録
                        </Typography>
                        <TextField
                            multiline
                            rows={3}
                            margin='dense'
                            fullWidth
                            variant='outlined'
                            value={description}
                            onChange={handleDescriptionChange}
                            error={!!errors.description}
                            helperText={errors.description}
                        />
                        <Box sx={{ flexDirection: "row" }}>
                            <Typography
                                sx={{ mt: 3 }}
                                variant='h6'>
                                開始日
                            </Typography>
                            <DateComponents
                                label='開始日'
                                date={startDate}
                                setDate={setStartDate}
                                minDate={dayjs(new Date("2000/01/01"))}
                                maxDate={dayjs(new Date("2299/12/31"))}
                            />
                        </Box>
                        <Box sx={{ flexDirection: "row" }}>
                            <Typography
                                sx={{ mt: 3 }}
                                variant='h6'>
                                終了日
                            </Typography>
                            <DateComponents
                                label='終了日'
                                date={endDate}
                                setDate={setEndDate}
                                minDate={startDate}
                                maxDate={dayjs(new Date("2299/12/31"))}
                            />
                        </Box>
                        {errors.dates && (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                {errors.dates}
                            </Alert>
                        )}
                        <Typography
                            sx={{ mt: 3 }}
                            variant='h6'>
                            繰り返し日
                        </Typography>
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
                        {errors.weekdays && (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                {errors.weekdays}
                            </Alert>
                        )}
                        <Typography variant='h6' sx={{ mt: 3 }}>目的</Typography>
                        <TextField
                            multiline
                            rows={3}
                            margin='dense'
                            fullWidth
                            variant='outlined'
                            value={purpose}
                            onChange={handlePurposeChange}
                            error={!!errors.purpose}
                            helperText={errors.purpose}
                        />
                        <FormControl
                            fullWidth
                            sx={{ my: 4 }}
                            error={!!errors.tag}>
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
                            {errors.tag && (
                                <Typography color="error" variant="caption" sx={{ mt: 1, ml: 2 }}>
                                    {errors.tag}
                                </Typography>
                            )}
                        </FormControl>
                    </Box>
                    <Box>
                        <Button
                            type='submit'
                            value='submit'
                            variant='contained'>
                            追加
                        </Button>
                    </Box>
                </form>
            </Box>

            {/* タスクの追加中はローディングを表示 */}
            {loading && <FullScreenLoading open={loading} />}
        </div>
    );
};

export default SelfAddForm;
