'use client';

import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2'
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ja';
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import React, { useContext, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TodoContext } from '../context/TodoContext';
import GetStickyCellStyle from './theme/GetStickyCellStyle';

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale('ja')
dayjs.tz.setDefault('Asia/Tokyo')

interface CalendarViewProps {
    title: string;
    description: string;
    date: Dayjs;
    completed: boolean;
    tag: string;
}

const Calendar = () => {
    const todoContext = useContext(TodoContext);

    if (!todoContext) {
        throw new Error(
            'TodoContext is undefined. Make sure to use TodoProvider.',
        );
    }

    const { todos } = todoContext;

    const todolist: CalendarViewProps[] = todos.flatMap((todo) =>
        Object.keys(todo.checkedDates).map((dateKey) => ({
            title: todo.title,
            description: todo.description,
            date: dayjs(dateKey),
            completed: todo.checkedDates[dateKey],
            tag: todo.tag
        })),
    );

    const [todaytodolist, setTodaytodolist] = useState<CalendarViewProps[]>([]);

    const [current, setCurrent] = useState<Dayjs>(dayjs()) // その月のカレンダーを表示
    const [select, setSelect] = useState<boolean>(false) // その日付をクリックするとその日の予定が出てくる
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null) // クリックされた日付を管理
    
    const nextMonthPage = () => {
        setCurrent(current.add(1, 'M'));
    }

    const prevMonthPage = () => {
        setCurrent(current.subtract(1, 'M'));
    }

    const resetCurrentPage = () => {
        setCurrent(dayjs());
    }

    const monthStart = dayjs(current).startOf('month') // 月初めの日付
    const monthEnd = dayjs(current).endOf('month'); // 月末の日付
    const cntMonth = dayjs(monthEnd).diff(monthStart, "day") // その月の日数
    const nextMonthStart = dayjs(current).add(1,'M').startOf('month');
    const nextMonthempty = () => { // 次の月の空白を数える
        if (nextMonthStart.day() === 0) {
            return 7;
        } else {
            return nextMonthStart.day();
        }
    }

    const daysInMonth: Dayjs[] = []; // その月の日付すべて
    for (let i = 0; i < cntMonth+1; i++) {
        // 初日から i 日加算した日付を配列に追加
        daysInMonth.push(monthStart.add(i, 'd'));
    }

    // 曜日の配列
    const weekDays = ["日", "月", "火", "水", "木", "金", "土"]

    // 日付にイベントがあるかチェック
    const hasEvents = (d: Dayjs) => {
        return todolist.some((todo) => todo.date.isSame(d, 'day'))
    }

    const isCurrentMonth = () => {
        if (current.format('M') === dayjs().format('M')) {
            return true;
        } else { return false; }
    }

    const holiday = (day: string) => day === "土" || day === "日";
    const satsun = (day: string) => day === "土";

    const clickCalendar = (d: Dayjs) => {
        setSelect(true);
        setSelectedDate(d);
        setTodaytodolist(todolist.filter((todo) => todo.date.isSame(d, 'day')));
    }
  
    return (
        <div>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h5" component="h2" fontWeight="bold" sx={{ml: 4}}>
                        {dayjs(current).format('YYYY')}年{dayjs(current).format('M')}月
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, mr: 4 }}>
                        <IconButton onClick={prevMonthPage} size="small">
                            <ChevronLeftIcon />
                        </IconButton>
                        <Button onClick={resetCurrentPage}>現在</Button>
                        <IconButton onClick={nextMonthPage} size="small">
                            <ChevronRightIcon />
                        </IconButton>
                    </Box>
                </Box>

                <Paper elevation={2} sx={{ overflow: "hidden", mx:4 }}>
                    <Grid container>
                    {/* 曜日のヘッダー */}
                    {weekDays.map((day: string) => (
                        <Grid
                        size={{xs:12/7}}
                        key={day}
                        sx={{
                            textAlign: "center",
                            py: 1,
                            borderBottom: 1,
                            borderRight: 1,
                            borderColor: "divider",
                            "&:last-child": {
                            borderRight: 0,
                            },
                            color: holiday(day) ? (satsun(day) ?
                        "#0000ff" : "#ff0000") : "#000000"
                        }}
                        >
                        <Typography fontWeight="medium">{day}</Typography>
                        </Grid>
                    ))}

                    {/* 空のセル（月の最初の日の前） */}
                    {Array(monthStart.day())
                        .fill(null)
                        .map((_, index) => (
                        <Grid
                            size={{xs:12/7}}
                            key={`empty-${index}`}
                            sx={{
                            height: 56,
                            borderBottom: 1,
                            borderRight: 1,
                            borderColor: "divider",
                            "&:nth-of-type(7n)": {
                                borderRight: 0,
                            },
                            }}
                        />
                        ))}

                    {/* 日付のセル */}
                    {daysInMonth.map((date, index) => {
                        const dayHasEvents: boolean = hasEvents(date) // その日タスクがあればtrue
                        const isSelected = selectedDate && dayjs(date).isSame(selectedDate, 'day')
                        const isTodayDate = () => {
                            return dayjs(date).isSame(dayjs(), 'day');
                          }

                        return (
                            <Grid
                                size={{xs:12/7}}
                                key={date.toString()}
                                sx={{
                                borderBottom: 1,
                                borderRight: 1,
                                borderColor: "divider",
                                "&:nth-of-type(7n)": {
                                    borderRight: 0,
                                },
                                "&:nth-last-of-type(-n+7)": {
                                    borderBottom: 0,
                                },
                                }}
                            >
                            <Button
                            fullWidth
                            sx={{
                                height: 56,
                                borderRadius: 0,
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                                padding: 1,
                                position: "relative",
                                color: !isCurrentMonth ? "text.disabled" : "text.primary",
                                backgroundColor: isSelected ? "#dcdcdc" : (isTodayDate() ? "#f0f0f0" : "transparent"),
                                "&:hover": {
                                backgroundColor: "#dcdcdc",
                                },
                            }}
                            onClick={() => {clickCalendar(date)}}
                            >
                            <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'center' }}>{date.date()}</Typography>
                            {dayHasEvents && (
                                <Box
                                sx={{
                                    width: 6,
                                    height: 6,
                                    bgcolor: "primary.main",
                                    borderRadius: "50%",
                                    position: "absolute",
                                    bottom: 8,
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                }}
                                />
                            )}
                            </Button>
                        </Grid>
                        )
                    })}

                    {/* 空のセル（月の最初の日の前） */}
                    {Array(7 - nextMonthempty())
                        .fill(null)
                        .map((_, index) => (
                        <Grid
                            size={{xs:12/7}}
                            key={`empty-${index}`}
                            sx={{
                            height: 56,
                            borderBottom: 1,
                            borderRight: 1,
                            borderColor: "divider",
                            "&:nth-of-type(7n)": {
                                borderRight: 0,
                            },
                            }}
                        />
                        ))}
                    </Grid>
                </Paper>
            </Box>
            { select ? 
            <Box sx={{m: 2}}>
                <TableContainer>
                    <Table sx={{ width: '100%' }} size="small" aria-label="a dense table">
                        <TableHead>
                        <TableRow>
                        <TableCell sx={GetStickyCellStyle(90,90,0,"left")}>タスク名</TableCell>
                        <TableCell sx={GetStickyCellStyle(90,90,0,"left")}>日付</TableCell>
                        <TableCell sx={GetStickyCellStyle(90,90,0,"left")}>チェック</TableCell>
                        <TableCell sx={GetStickyCellStyle(90,90,0,"left")}>タグ</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {todaytodolist.map((todo) => (
                                <TableRow
                                    key={todo.title}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell sx={GetStickyCellStyle(90,90,0,"left")}>{todo.title}</TableCell>
                                    <TableCell sx={GetStickyCellStyle(90,90,0,"left")}>{todo.date.format('YYYY/MM/DD')}</TableCell>
                                    <TableCell sx={GetStickyCellStyle(90,90,0,"left")}>{todo.completed ? "済":"未"}</TableCell>
                                    <TableCell sx={GetStickyCellStyle(90,90,0,"left")}>{todo.tag}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box> :
            <Typography variant='subtitle1' 
                sx={{m:4}}>
                日付をクリックすると情報が確認できます。</Typography>}
            
        </div>
    );
};

export default Calendar;
