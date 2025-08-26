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
    SelectChangeEvent,
    Switch,
    TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { DateComponents } from "./DateComponents";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ja";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useRouter } from "next/navigation";
import { TodoContext } from "../context/TodoContext";
import { taglist } from "./tags";
import { AuthContext } from "../context/AuthContext";
import FullScreenLoading from "./parts/fullScreenLoading";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ja");
dayjs.tz.setDefault("Asia/Tokyo");

interface oneTodo {
    id: number;
    todo: todo;
    editOpen: boolean;
    setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface todo {
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

const editPractice = async (
    id: number,
    title: string,
    description: string | null,
    continuedays: number,
    checkedDates: Record<string, boolean>,
    startdate: string,
    enddate: string,
    interval: number | string[],
    purpose: string,
    tag: string,
    userId: string,
) => {
    const res = await fetch(`/api/todo/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            id,
            title,
            description,
            continuedays,
            checkedDates,
            startdate,
            enddate,
            interval,
            purpose,
            tag,
            userId,
        }),
        headers: {
            "Content-type": "application/json",
        },
    });

    return res.json();
};

const Edit: React.FC<oneTodo> = ({ id, todo, editOpen, setEditOpen }) => {
    const router = useRouter();

    const todoContext = useContext(TodoContext);

    if (!todoContext) {
        throw new Error(
            "TodoContext is undefined. Make sure to use TodoProvider.",
        );
    }

    const { fetchAllTodos } = todoContext;

    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error(
            "AuthContext is undefined. Make sure to use TodoProvider.",
        );
    }

    const { loginUser } = authContext;

    const [loading, setLoading] = useState(false);

    // フォームのクローズ
    const handleEditClose = () => {
        //閉じたらすべてリセット
        setEditOpen(false);
        formReset();
    };

    const formReset = () => {
        setTitle(todo.title);
        setdesc(todo.description);
        setSd(dayjs(todo.startdate));
        setEd(dayjs(todo.enddate));
        setNumber(initialinterval() as number);
        setSelectedDays(initialinterval() as string[]);
        setNdays(intervaltype());
        setpurp(todo.purpose);
        setTag(todo.tag);
    };

    // タイトルに書き込まれたか判定
    const [title, setTitle] = useState<string>(todo.title);
    const handletitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    // 詳細テキストに書き込まれたか判定
    const [desc, setdesc] = useState<string>(todo.description);
    const handledesc = (e: React.ChangeEvent<HTMLInputElement>) => {
        setdesc(e.target.value);
    };

    // 日付フォームをStateで管理（sdがstartdate,edがenddate）
    const [sd, setSd] = useState<Dayjs>(dayjs(todo.startdate)); //Date型
    const [ed, setEd] = useState<Dayjs>(dayjs(todo.enddate)); //Date型

    // intervalの型を判定
    const intervaltype = () => {
        if (typeof todo.interval === "number") {
            return true;
        } else {
            return false;
        }
    };

    // n日ごとの場合はnumに、曜日はarrに格納。
    const initialinterval = () => {
        if (intervaltype()) {
            return todo.interval as number; // 数値としてキャスト
        }
        return todo.interval as string[]; // 文字列配列としてキャスト
    };

    // n日ごとの場合
    const numberofdays: number[] = [1, 2, 3, 4, 5, 6, 7];
    const [number, setNumber] = useState<number>(initialinterval() as number);
    const handleNumber = (e: SelectChangeEvent<number>) => {
        const selectedNumber = Number(e.target.value);
        setNumber(selectedNumber);
    };

    // 曜日を選んだ場合
    const [selectedDays, setSelectedDays] = useState<string[]>(
        initialinterval() as string[],
    );
    const handleChip = (day: string) => {
        setSelectedDays((prevdays) => {
            // 選択した日が含まれているか
            if (prevdays.includes(day)) {
                // 含まれていた場合リストから消す

                return prevdays.filter((d) => d !== day);
            } else {
                // 含まれていなかった場合追加
                return [...prevdays, day];
            }
        });
    };

    // n日ごとか曜日かを選ぶときのstate trueの場合はn日ごと、falseの場合は曜日
    const [ndays, setNdays] = useState<boolean>(intervaltype());
    const handleNdays = () => {
        setNdays(!ndays);
    };

    // switchした場合リセット（例えば、曜日に切り替えた場合日にちがリセット）
    useEffect(() => {
        if (ndays === true) {
            setSelectedDays(initialinterval() as string[]);
        } else {
            setNumber(initialinterval() as number);
        }
    }, [ndays]);

    // 目的のテキストを管理
    const [purp, setpurp] = useState<string>(todo.purpose);
    const handlepurpose = (e: React.ChangeEvent<HTMLInputElement>) => {
        setpurp(e.target.value);
    };

    // タグの選択
    const tags = taglist;
    const [tag, setTag] = useState<string>(todo.tag);
    const handleTagSelect = (e: SelectChangeEvent) => {
        // 選択
        setTag(e.target.value as string);
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        try {
            setLoading(true);

            // ndaysがtrueの場合はn日を返す、falseの場合は曜日を返す
            const setint = (ndays: boolean) => {
                if (ndays) {
                    return number;
                } else {
                    return selectedDays;
                }
            };

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
                        if (selectedDays.includes(day)) {
                            const slashdate = dayjs(date).format("YYYY/MM/DD");
                            objdate[slashdate] = false;
                        }
                        date = dayjs(date).add(1, "d");
                    }
                    return objdate;
                }
            };

            const checkdates: Record<string, boolean> = createCheckedDates(
                sd,
                ed,
                setint(ndays),
            ); // 日付: falseの辞書を作成
            const contdays = todo.continuedays; //編集なので達成日はそのまま

            await editPractice(
                id,
                title,
                desc,
                contdays,
                checkdates,
                sd?.format("YYYY/MM/DD"),
                ed?.format("YYYY/MM/DD"),
                setint(ndays),
                purp,
                tag,
                loginUser!.id,
            );

            await fetchAllTodos();
            setEditOpen(false);
            router.push("/list");
            router.refresh();
            formReset();
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
                        variant='h4'>
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
                            onChange={handletitle}
                        />
                        <DialogContentText variant='h6'>詳細</DialogContentText>
                        <TextField
                            multiline
                            rows={3}
                            margin='dense'
                            fullWidth
                            variant='outlined'
                            value={desc}
                            onChange={handledesc}
                        />
                        <Box sx={{ flexDirection: "row" }}>
                            <DialogContentText
                                sx={{ mt: 3 }}
                                variant='h6'>
                                開始日
                            </DialogContentText>
                            <DateComponents
                                label='開始日'
                                date={sd}
                                setDate={setSd}
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
                                date={ed}
                                setDate={setEd}
                                minDate={sd}
                                maxDate={dayjs(new Date("2299/12/31"))}
                            />
                        </Box>
                        <DialogContentText
                            sx={{ mt: 3 }}
                            variant='h6'>
                            繰り返し日
                        </DialogContentText>
                        {ndays ? "N日ごと" : "曜日"}
                        <Switch
                            checked={ndays}
                            onChange={handleNdays}
                        />
                        <Box>
                            {ndays ? (
                                <Select
                                    required
                                    labelId='demo-multiple-name-label'
                                    id='demo-multiple-name'
                                    value={number}
                                    onChange={handleNumber}>
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
                                                selectedDays.includes(day)
                                                    ? "filled"
                                                    : "outlined"
                                            }
                                            color={
                                                selectedDays.includes(day)
                                                    ? "primary"
                                                    : "default"
                                            }
                                            onClick={() => handleChip(day)}
                                        />
                                    ))}
                                </FormGroup>
                            )}
                        </Box>
                        <DialogContentText variant='h6'>目的</DialogContentText>
                        <TextField
                            multiline
                            rows={3}
                            margin='dense'
                            fullWidth
                            variant='outlined'
                            value={purp}
                            onChange={handlepurpose}
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
                                onChange={handleTagSelect}
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
