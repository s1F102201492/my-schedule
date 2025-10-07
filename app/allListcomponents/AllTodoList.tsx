"use client";

import React, { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import AllTodoItem from "./AllTodoItem";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ChangeSlashDay } from "../components/calculate/ChangeSlashDay";
import { CheckRate } from "../components/calculate/CheckRate";
import FadeLoading from "../components/parts/FadeLoading";
import { TodoModel } from "../Models/models";

const AllTodoList = () => {
    const todoContext = useContext(TodoContext);

    if (!todoContext) {
        throw new Error(
            "TodoContext is undefined. Make sure to use TodoProvider.",
        );
    }

    const { todos, loading } = todoContext;

    const [search, setSearch] = useState<string>(""); // 検索機能
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const [active, setActive] = useState<string>("all");
    const handleActive = (
        e: React.MouseEvent<HTMLElement>,
        newActive: string,
    ) => {
        setActive(newActive);
    };

    const [sort, setSort] = useState<string>("startDateAsc");
    const selectSort = (e: SelectChangeEvent) => {
        setSort(e.target.value);
    };

    //文字検索
    const searchtodos = todos.filter((todo) =>
        todo.title.match(new RegExp(".*" + search + ".*")),
    );

    //フィルター
    const filtertodos = searchtodos.filter((todo) => {
        const todayslash = ChangeSlashDay(new Date());

        if (active === "active") {
            //アクティブの場合
            return (
                todayslash >= ChangeSlashDay(new Date(todo.startdate)) &&
                todayslash <= ChangeSlashDay(new Date(todo.enddate))
            );
        } else if (active === "archived") {
            return (
                todayslash < ChangeSlashDay(new Date(todo.startdate)) ||
                todayslash > ChangeSlashDay(new Date(todo.enddate))
            );
        } else {
            return true;
        }
    });

    const compareDates = (dateA: string, dateB: string) =>
        new Date(dateA).getTime() - new Date(dateB).getTime();
    const compareProgress = (a: TodoModel, b: TodoModel) =>
        CheckRate(a) - CheckRate(b);

    // ソート用の関数をオブジェクトで管理
    const sortFunctions: Record<
        string,
        (a: TodoModel, b: TodoModel) => number
    > = {
        startDateAsc: (a, b) => compareDates(a.startdate, b.startdate),
        startDateDesc: (a, b) => compareDates(b.startdate, a.startdate),
        endDateAsc: (a, b) => compareDates(a.enddate, b.enddate),
        endDateDesc: (a, b) => compareDates(b.enddate, a.enddate),
        progressAsc: compareProgress,
        progressDesc: (a, b) => compareProgress(b, a),
    };

    const finaltodos = filtertodos.sort(sortFunctions[sort] || (() => 0));

    return (
        <div>
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ mb: 4 }}>
                    <TextField
                            fullWidth
                            variant='outlined'
                            label='タスクを検索'
                            sx={{ mb: 4 }}
                            value={search}
                            onChange={handleSearch}
                        />

                    {/* PC用 */}
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}>
                            <ToggleButtonGroup
                                exclusive
                                aria-label='task filter'
                                value={active}
                                onChange={(e, newActive) =>
                                    handleActive(e, newActive)
                                }>
                                <ToggleButton
                                    value='all'
                                    aria-label='all tasks'>
                                    全て
                                </ToggleButton>
                                <ToggleButton
                                    value='active'
                                    aria-label='active tasks'>
                                    アクティブ
                                </ToggleButton>
                                <ToggleButton
                                    value='archived'
                                    aria-label='archived tasks'>
                                    アーカイブ済み
                                </ToggleButton>
                            </ToggleButtonGroup>
                            <FormControl sx={{ minWidth: 120 }}>
                                <InputLabel id='sort-select-label'>
                                    並べ替え
                                </InputLabel>
                                <Select
                                    labelId='sort-select-label'
                                    label='並べ替え'
                                    value={sort}
                                    onChange={selectSort}>
                                    <MenuItem value='startDateAsc'>
                                        開始日が早い順
                                    </MenuItem>
                                    <MenuItem value='startDateDesc'>
                                        開始日が遅い順
                                    </MenuItem>
                                    <MenuItem value='endDateAsc'>
                                        終了日が早い順
                                    </MenuItem>
                                    <MenuItem value='endDateDesc'>
                                        終了日が遅い順
                                    </MenuItem>
                                    <MenuItem value='progressAsc'>
                                        達成率が低い順
                                    </MenuItem>
                                    <MenuItem value='progressDesc'>
                                        達成率が高い順
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>

                    {/* モバイル用 */}
                    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                        <Box sx={{ mb: 4 }} >
                            <ToggleButtonGroup
                                fullWidth
                                exclusive
                                aria-label='task filter'
                                value={active}
                                onChange={(e, newActive) =>
                                    handleActive(e, newActive)
                                }>
                                <ToggleButton
                                    value='all'
                                    aria-label='all tasks'>
                                    全て
                                </ToggleButton>
                                <ToggleButton
                                    value='active'
                                    aria-label='active tasks'>
                                    アクティブ
                                </ToggleButton>
                                <ToggleButton
                                    value='archived'
                                    aria-label='archived tasks'>
                                    アーカイブ済み
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                        <FormControl fullWidth>
                            <InputLabel id='sort-select-label'>
                                並べ替え
                            </InputLabel>
                            <Select
                                
                                labelId='sort-select-label'
                                label='並べ替え'
                                value={sort}
                                onChange={selectSort}>
                                <MenuItem value='startDateAsc'>
                                    開始日が早い順
                                </MenuItem>
                                <MenuItem value='startDateDesc'>
                                    開始日が遅い順
                                </MenuItem>
                                <MenuItem value='endDateAsc'>
                                    終了日が早い順
                                </MenuItem>
                                <MenuItem value='endDateDesc'>
                                    終了日が遅い順
                                </MenuItem>
                                <MenuItem value='progressAsc'>
                                    達成率が低い順
                                </MenuItem>
                                <MenuItem value='progressDesc'>
                                    達成率が高い順
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                {loading ? (
                    <FadeLoading loading={loading} />
                ) : (
                    <Grid container spacing={2} justifyContent="center">
                        {finaltodos.map((todo) => (
                            <AllTodoItem
                                key={todo.id}
                                todo={todo}
                            />
                        ))}
                    </Grid>
                )}
            </Box>
        </div>
    );
};

export default AllTodoList;
