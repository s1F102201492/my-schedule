'use client';

import React, { useContext, useEffect, useState } from 'react';
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormGroup,
    MenuItem,
    Select,
    SelectChangeEvent,
    Switch,
    TextField,
} from '@mui/material';
import { DateComponents } from '../components/DateComponents';
import { TodoContext } from './TodoContext';
import dayjs, { Dayjs } from 'dayjs';
import Pickcolor from './Pickcolor';
import { useRouter } from 'next/navigation';
import CreateCheckedDates from './calculate/CreateCheckedDates';

dayjs.locale('ja');

const addTodo = async (
    title: string,
    description: string,
    continuedays: number,
    checkedDates: Record<string, boolean>,
    startdate: string,
    enddate: string,
    interval: number | string[],
    color: string,
) => {
    const res = await fetch('/api/todo', {
        method: 'POST',
        body: JSON.stringify({
            title,
            description,
            continuedays,
            checkedDates,
            startdate,
            enddate,
            interval,
            color,
        }),
        headers: {
            'Content-type': 'application/json',
        },
    });

    return res.json();
};

interface FormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  locate: string;
}

const Form:React.FC<FormProps> = ({ open, setOpen, locate }) => {
    const router = useRouter();

    const todoContext = useContext(TodoContext);

    if (!todoContext) {
        throw new Error(
            'TodoContext is undefined. Make sure to use TodoProvider.',
        );
    }

    const { fetchAllTodos } = todoContext;

    // フォームのクローズ
    const handleClose = () => {
      //閉じたらすべてリセット
      setOpen(false);
      formReset();
    };

    const formReset = () => {
        setTitle('');
        setSd(dayjs());
        setEd(dayjs());
        setNumber(1);
        setSelectedDays([]);
        setNdays(true);
        setSelectColor('');
    };

    // タイトルに書き込まれたか判定
    const [title, setTitle] = useState<string>('');
    const handletitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    // 詳細テキストに書き込まれたか判定
    const [desc, setdesc] = useState<string>('');
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

    // switchした場合リセット（例えば、曜日に切り替えた場合日にちがリセット）
    useEffect(() => {
        if (ndays === true) {
            setSelectedDays([]);
        } else {
            setNumber(0);
        }
    }, [ndays]);

    // color
    const [selectColor, setSelectColor] = useState<string>('#f44336');

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

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
            selectedDays
        ); // 日付: falseの辞書を作成

        let contdays: number = 0; // continuedays 登録したてなので最初は0

        await addTodo(
            title,
            desc,
            contdays,
            checkdates,
            sd?.format('YYYY/MM/DD'),
            ed?.format('YYYY/MM/DD'),
            setint(ndays),
            selectColor,
        );

        await fetchAllTodos();
        router.push(locate);
        router.refresh();
        setOpen(false);
        formReset();
    };

    return (
      <div>
        <Dialog
            fullWidth
            open={open}
            onClose={handleClose}>
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
                    <Box sx={{ flexDirection: 'row' }}>
                        <DialogContentText
                            sx={{ mt: 3 }}
                            variant='h6'>
                            開始日
                        </DialogContentText>
                        <DateComponents
                            label='開始日'
                            date={sd}
                            setDate={setSd}
                            minDate={dayjs(new Date('2000/01/01'))}
                            maxDate={dayjs(new Date('2299/12/31'))}
                        />
                    </Box>
                    <Box sx={{ flexDirection: 'row' }}>
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
                            maxDate={dayjs(new Date('2299/12/31'))}
                        />
                    </Box>
                    <DialogContentText
                        sx={{ mt: 3 }}
                        variant='h6'>
                        繰り返し日
                    </DialogContentText>
                    {ndays ? 'N日ごと' : '曜日'}
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
                                {['月','火','水','木','金','土','日',
                                ].map((day) => (
                                    <Chip
                                        key={day}
                                        label={day}
                                        variant={
                                            selectedDays.includes(day)
                                                ? 'filled'
                                                : 'outlined'
                                        }
                                        color={
                                            selectedDays.includes(day)
                                                ? 'primary'
                                                : 'default'
                                        }
                                        onClick={() => handleChip(day)}
                                    />
                                ))}
                            </FormGroup>
                        )}
                    </Box>
                    <Box>
                        <Pickcolor
                            selectColor={selectColor}
                            setSelectColor={setSelectColor}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>閉じる</Button>
                    <Button
                        type='submit'
                        value='submit'
                        variant='contained'>
                        追加
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
      </div>
    );
};

export default Form;
