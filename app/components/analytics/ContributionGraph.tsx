import { CalendarMonth } from '@mui/icons-material'
import { Box, Card, CardContent, Typography } from '@mui/material'
import React, { useContext } from 'react'
import theme from '../theme/theme'
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ja";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { TodoContext } from '@/app/context/TodoContext';
import { ResponsiveCalendar } from '@nivo/calendar'
import { ChangeContributionData } from './ChangeContributionData';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ja");
dayjs.tz.setDefault("Asia/Tokyo");


export const ContributionGraph = () => {
    const todoContext = useContext(TodoContext);

    if (!todoContext) {
        throw new Error(
            "TodoContext is undefined. Make sure to use TodoProvider.",
        );
    }

    const { todos } = todoContext;

    const today = dayjs();
    const fromDate = today.subtract(1, 'year').add(1, 'day')
    const toDate = today

    // タスク完了をした日付を格納
    const map_Date = new Map<string, boolean>();

    // タスクを達成していた日付をMapオブジェクトに格納
    for (const todo of todos) {
        Object.keys(todo.checkedDates).map((date) => {
            // 現在より前の日付のみ対象
            if (dayjs().isAfter(dayjs(date), "day")) {
                if (todo.checkedDates[date] == true && map_Date.has(date)) {
                    // 日付がもうある　かつ　チェック済みのタスク
                    if (map_Date.get(date) == false) {
                        return map_Date.set(date, true);
                    }

                    // trueで格納されているものがある場合は格納しない
                } else if (
                    todo.checkedDates[date] == false &&
                    map_Date.has(date)
                ) {
                    return;
                } else {
                    // 日付がない場合は重複の可能性はないので格納
                    return map_Date.set(date, todo.checkedDates[date]);
                }
            } else {
                // 現在よりあとの日付は入れない
                return;
            }
        });
    }

    // Mapオブジェクトと配列に変換
    const dateArray = Array.from(map_Date.keys());

    // dataArrayに格納されている日付を日付順に並べ替え
    const dateArray_Asc = dateArray.sort((a, b) => dayjs(a).diff(dayjs(b)));

    // 日付順に並べ替えたものを再びMapオブジェクト
    const map_Date_Asc = new Map<string, boolean>();
    dateArray_Asc.forEach((date) => {
        if (map_Date.get(date)) {
            map_Date_Asc.set(date, map_Date.get(date)!);
        }
            
    });

    // サンプルデータ
    const data = ChangeContributionData(todos)

  return (
    <div>
        {/* カレンダー表示 */}
        <Card elevation={2}>
            <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <CalendarMonth sx={{ mr: 2, color: theme.palette.primary.main, fontSize: 32 }} />
                <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.primary.dark }}>
                    達成状況
                </Typography>
            </Box>

            <Box sx={{ height: 220 }}>
                <ResponsiveCalendar
                        data={data}
                        from={fromDate.format("YYYY-MM-DD")}
                        to={toDate.format("YYYY-MM-DD")}
                        emptyColor="#eeeeee"
                        colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
                        margin={{ top: 40 }}
                        yearSpacing={40}
                        monthBorderColor="#ffffff"
                        dayBorderWidth={2}
                        dayBorderColor="#ffffff"
                        legends={[
                            {
                                anchor: 'bottom-right',
                                direction: 'row',
                                translateY: 36,
                                itemCount: 4,
                                itemWidth: 42,
                                itemHeight: 36,
                                itemsSpacing: 14,
                                itemDirection: 'right-to-left'
                            }
                        ]}
                    />
            </Box>
            
            </CardContent>
        </Card>
            
    </div>
  )
}
