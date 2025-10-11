"use client";

import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    Button,
    Chip,
    FormControl,
    FormGroup,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Switch,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import AutoAwesomeSharpIcon from '@mui/icons-material/AutoAwesomeSharp';
import { DateComponents } from "../DateComponents";
import { TodoContext } from "../../context/TodoContext";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useRouter } from "next/navigation";
import CreateCheckedDates from "../calculate/CreateCheckedDates";
import { taglist } from "../tags";
import { AuthContext } from "../../context/AuthContext";
import FullScreenLoading from "../parts/fullScreenLoading";
import { AddTaskPageSwitchProps } from "../../Models/models";

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

    const formReset = () => {
        setTitle("");
        setSd(dayjs());
        setEd(dayjs());
        setNumber(1);
        setSelectedDays([]);
        setNdays(true);
        setpurp("");
        setTag("");
    };

    // タスクの追加中はローディングを表示
    const [loading, setLoading] = useState(false);

    // タイトルに書き込まれたか判定
    const [title, setTitle] = useState<string>("");
    const handletitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    // 詳細テキストに書き込まれたか判定
    const [desc, setdesc] = useState<string>("");
    const handledesc = (e: React.ChangeEvent<HTMLInputElement>) => {
        setdesc(e.target.value);
    };

    // 日付フォームをStateで管理（sdがstartdate,edがenddate）
    const [sd, setSd] = useState<Dayjs>(dayjs()); //Date型
    const [ed, setEd] = useState<Dayjs>(dayjs()); //Date型

    // n日ごとの場合
    const numberofdays: number[] = [1, 2, 3, 4, 5, 6, 7];
    const [number, setNumber] = useState<number>(1);
    const handleNumber = (e: SelectChangeEvent<number>) => {
        const selectedNumber = Number(e.target.value);
        setNumber(selectedNumber);
    };

    // 曜日を選んだ場合
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
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
    const [ndays, setNdays] = useState<boolean>(true);
    const handleNdays = () => {
        setNdays(!ndays);
    };

    // 目的のテキストを管理
    const [purp, setpurp] = useState<string>("");
    const handlePurpose = (e: React.ChangeEvent<HTMLInputElement>) => {
        setpurp(e.target.value);
    };

    // タグの選択
    const tags = taglist;
    const [tag, setTag] = useState<string>("");
    const handleTagSelect = (e: SelectChangeEvent) => {
        // 選択
        setTag(e.target.value as string);
    };

    // switchした場合リセット（例えば、曜日に切り替えた場合日にちがリセット）
    useEffect(() => {
        if (ndays === true) {
            setSelectedDays([]);
        } else {
            setNumber(0);
        }
    }, [ndays]);

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        try {
            setLoading(true);

            // ndaysがtrueの場合はn日を返す、falseの場合は曜日を返す(interval)
            const setint = (ndays: boolean) => {
                if (ndays) {
                    return number;
                } else {
                    return selectedDays;
                }
            };

            const checkdates: Record<string, boolean> = CreateCheckedDates(
                sd,
                ed,
                setint(ndays),
                selectedDays,
            ); // 日付: falseの辞書を作成

            await addTodo({
                title,
                description: desc,
                checkedDates: checkdates,
                continuedays: 0,
                startdate: sd?.format("YYYY/MM/DD"),
                enddate: ed?.format("YYYY/MM/DD"),
                interval: setint(ndays),
                purpose: purp,
                tag,
            });

            await fetchAllTodo();
            router.push("/list");
            router.refresh();

            setTimeout(() => {
                formReset();
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
                            required
                            margin='dense'
                            fullWidth
                            variant='outlined'
                            value={title}
                            onChange={handletitle}
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
                            value={desc}
                            onChange={handledesc}
                        />
                        <Box sx={{ flexDirection: "row" }}>
                            <Typography
                                sx={{ mt: 3 }}
                                variant='h6'>
                                開始日
                            </Typography>
                            <DateComponents
                                label='開始日'
                                date={sd}
                                setDate={setSd}
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
                                date={ed}
                                setDate={setEd}
                                minDate={sd}
                                maxDate={dayjs(new Date("2299/12/31"))}
                            />
                        </Box>
                        <Typography
                            sx={{ mt: 3 }}
                            variant='h6'>
                            繰り返し日
                        </Typography>
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
                        <Typography variant='h6' sx={{ mt: 3 }}>目的</Typography>
                        <TextField
                            multiline
                            rows={3}
                            margin='dense'
                            fullWidth
                            variant='outlined'
                            value={purp}
                            onChange={handlePurpose}
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
