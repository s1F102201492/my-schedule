"use client";

import {
    Box,
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ja";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import GetStickyCellStyle from "./theme/GetStickyCellStyle";
import { useCalendar } from "../hooks/ui/useCalendar";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ja");
dayjs.tz.setDefault("Asia/Tokyo");

const Calendar = () => {
    const {
        current,
        selectedDate,
        todayTodoList,
        daysInMonth,
        weekDays,
        actions,
        firstDayOfMonth,
    } = useCalendar();

    const { nextMonth, prevMonth, resetToToday, handleClickDate, hasEvents } = actions;

    const holiday = (day: string) => day === "土" || day === "日";
    const satsun = (day: string) => day === "土";

    return (
        <div>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3
                    }}>
                    <Typography
                        variant='h5'
                        component='h2'
                        sx={{ ml: 4 }}>
                        {dayjs(current).format("YYYY")}年
                        {dayjs(current).format("M")}月
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, mr: 4 }}>
                        <IconButton
                            onClick={prevMonth}
                            size='small'>
                            <ChevronLeftIcon />
                        </IconButton>
                        <Button onClick={resetToToday}>現在</Button>
                        <IconButton
                            onClick={nextMonth}
                            size='small'>
                            <ChevronRightIcon />
                        </IconButton>
                    </Box>
                </Box>

                <Paper
                    elevation={2}
                    sx={{ overflow: "hidden", mx: 4 }}>
                    <Grid container>
                        {/* 曜日のヘッダー */}
                        {weekDays.map((day: string) => (
                            <Grid
                                size={{ xs: 12 / 7 }}
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
                                    color: holiday(day)
                                        ? satsun(day)
                                            ? "#0000ff"
                                            : "#ff0000"
                                        : "#000000",
                                }}>
                                <Typography fontWeight='medium'>
                                    {day}
                                </Typography>
                            </Grid>
                        ))}

                        {/* 空のセル（月の最初の日の前） */}
                        {Array(firstDayOfMonth)
                            .fill(null)
                            .map((_, index) => (
                                <Grid
                                    size={{ xs: 12 / 7 }}
                                    key={`empty-start-${index}`}
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
                        {daysInMonth.map((date) => {
                            const isSelected = selectedDate && dayjs(date).isSame(selectedDate, "day");
                            const isToday = dayjs(date).isSame(dayjs(), "day");

                            return (
                                <Grid
                                    size={{ xs: 12 / 7 }}
                                    key={date.toString()}
                                    sx={{
                                        borderBottom: 1,
                                        borderRight: 1,
                                        borderColor: "divider",
                                        "&:nth-of-type(7n)": {
                                            borderRight: 0,
                                        },
                                    }}>
                                    <Button
                                        fullWidth
                                        sx={{
                                            minWidth: 0,
                                            height: 56,
                                            borderRadius: 0,
                                            justifyContent: "flex-start",
                                            alignItems: "flex-start",
                                            padding: 1,
                                            position: "relative",
                                            color: "text.primary",
                                            backgroundColor: isSelected
                                                ? "#dcdcdc"
                                                : isToday
                                                  ? "#f0f0f0"
                                                  : "transparent",
                                            "&:hover": {
                                                backgroundColor: "#dcdcdc",
                                            },
                                        }}
                                        onClick={() => handleClickDate(date)}>
                                        <Typography
                                            variant='body2'
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                            }}>
                                            {date.date()}
                                        </Typography>
                                        {hasEvents(date) && (
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
                            );
                        })}
                    </Grid>
                </Paper>
            </Box>
            {selectedDate ? (
                <Box sx={{ m: 2 }}>
                    <TableContainer>
                        <Table
                            sx={{ width: "100%" }}
                            size='small'
                            aria-label='a dense table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>タスク名</TableCell>
                                    <TableCell>日付</TableCell>
                                    <TableCell>チェック</TableCell>
                                    <TableCell>タグ</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {todayTodoList.map((todo) => (
                                    <TableRow
                                        key={todo.title}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                { border: 0 },
                                        }}>
                                        <TableCell style={{ maxWidth: 160 }}>
                                            <Typography sx={{
                                                display: '-webkit-box',
                                                overflow: 'hidden',
                                                WebkitBoxOrient: 'vertical',
                                                WebkitLineClamp: 1 }}>
                                                {todo.title}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            {todo.date.format("YYYY/MM/DD")}
                                        </TableCell>
                                        <TableCell>
                                            {todo.completed ? "済" : "未"}
                                        </TableCell>
                                        <TableCell>
                                            {todo.tag}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            ) : (
                <Typography
                    variant='subtitle1'
                    sx={{ m: 4 }}>
                    日付をクリックすると情報が確認できます。
                </Typography>
            )}
        </div>
    );
};

export default Calendar;
