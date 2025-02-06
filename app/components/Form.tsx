'use client'

import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, MenuItem, Select, SelectChangeEvent, Switch, TextField } from '@mui/material';
import { DateComponents } from '../components/DateComponents';
import { TodoContext } from './TodoContext';
import dayjs, { Dayjs } from 'dayjs';
import Pickcolor from './Pickcolor';

dayjs.locale('ja');

const Form = () => {

  const todoContext = useContext(TodoContext);
  
  if (!todoContext) {
    throw new Error('TodoContext is undefined. Make sure to use TodoProvider.');
  }

  const { todoAdd } = todoContext;

// フォームのオープン
  const [open, setOpen] = useState<boolean>(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


// テキストに書き込まれたか判定 
  const [title, setTitle] = useState<string>('');
  const handletitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

// 日付フォームをStateで管理（sdがstartdate,edがenddate）
  const [sd, setSd] = useState<Dayjs>(dayjs()); //Date型
  const [ed, setEd] = useState<Dayjs>(dayjs()); //Date型

// n日ごとの場合
  const numberofdays:number[] = [1, 2, 3, 4, 5, 6, 7]
  const [number, setNumber] = useState<number>(1);
  const handleNumber = (e: SelectChangeEvent<number>) => {
    const selectedNumber = Number(e.target.value);
    setNumber(selectedNumber);
  }

// 曜日を選んだ場合
  const [selectedDays, setSelectedDays] = useState<string[]>([])
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
  }

  // switchした場合リセット（例えば、曜日に切り替えた場合日にちがリセット）
  useEffect(() => {
    if (ndays === true) {
      setSelectedDays([]);
    } else {
      setNumber(0);
    }
  },[ndays]);

  // color
  const [selectColor, setSelectColor] = useState<string>('#FF0000');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // id
    const createId = () => Math.random().toString(36).substring(2);

    // 継続日
      const counterContinuedays = (checkedDates:Record<string, boolean>) => {
        let counter: number = 0
        for (const elem in checkedDates) {
          if (checkedDates[elem] === true) {
            counter += 1;
          }
        }
        return counter;
      }

    // ndaysがtrueの場合はn日を返す、falseの場合は曜日を返す
    const setint = (ndays: boolean) => {
      if (ndays) {
        return number;
      } else { return selectedDays; }
    };

    const createCheckedDates = (sd: Dayjs, ed: Dayjs, interval: number | string[]) => {
      let objdate: Record<string, boolean> = {};
      if (typeof interval === 'number') { // 日ごとの場合
        let date = sd;
        while (dayjs(date).isBefore(dayjs(ed).add(1,'d'))) {
          const hyphendate = dayjs(date).format('YYYY-MM-DD')
          objdate[hyphendate] = false
          date = dayjs(date).add(interval, 'd')
        };
        return objdate;

      } else { // 曜日の場合
        let date = sd;
        while (dayjs(date).isBefore(dayjs(ed).add(1,'d'))) {
          const day = dayjs(date).format('ddd');
          if (selectedDays.includes(day)) {
            const hyphendate = dayjs(date).format('YYYY-MM-DD');
            objdate[hyphendate] = false;

          }
          date = dayjs(date).add(1, 'd');
        };
        return objdate;
      }
    };    
    
    const checkdates:Record<string, boolean> = 
    createCheckedDates(sd, ed, setint(ndays)); // 日付: falseの辞書を作成
    const contdays = counterContinuedays(checkdates); //checkdatesから達成日を計算

    const newTodo = {
      id: createId(),
      title: title,
      description: null,
      continuedays: contdays,
      checkedDates: checkdates,
      startdate: sd?.format('YYYY-MM-DD'),
      enddate: ed?.format('YYYY-MM-DD'),
      interval: setint(ndays),
      color: selectColor
    }

    todoAdd(newTodo);
    console.log(newTodo)
    setOpen(false);
  };

  return (
    <div>
      <Box sx={{m: 2}}>
      <Button variant="contained" onClick={handleClickOpen}>
        予定を追加
      </Button>
      </Box>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          {/* フォーム全体をフォームタグで囲む */}
          <DialogTitle sx={{m: 1}} variant='h4'>タスクや習慣を追加する</DialogTitle>
          <DialogContent>
            <DialogContentText variant='h6'>
              タイトル
            </DialogContentText>
            <TextField
              required
              margin="dense"
              fullWidth
              variant="outlined"
              value={title}
              onChange={handletitle}
            />
            <Box sx={{ flexDirection: 'row' }}>
              <DialogContentText sx={{mt: 3}} variant='h6'>
                開始日
              </DialogContentText>
              <DateComponents label='開始日' date={sd} setDate={setSd}
              minDate={dayjs(new Date("2000-01-01"))} maxDate={ed}
              />
            </Box>
            <Box sx={{ flexDirection: 'row' }}>
              <DialogContentText sx={{mt: 3}} variant='h6'>
                終了日
              </DialogContentText>
              <DateComponents label='終了日' date={ed} setDate={setEd}
              minDate={sd} maxDate={dayjs(new Date("2299-12-31"))}
              />
            </Box>
            <DialogContentText sx={{mt: 3}} variant='h6'>
              繰り返し日
            </DialogContentText>
            {ndays ? 'N日ごと' : '曜日'}
            <Switch 
            checked={ndays}
            onChange={handleNdays} />
            <Box>
              {ndays ? <Select
                required
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={number}
                onChange={handleNumber}
              >
                {numberofdays.map((num) => (
                  <MenuItem
                    key={num}
                    value={num}
                  >
                    {num}
                  </MenuItem>
                ))}
              </Select>
              :
              <FormGroup row>
              {['月', '火', '水', '木', '金', '土', '日'].map((day) => (
                <Chip key={day} label={day} variant={selectedDays.includes(day) ? 'filled' : 'outlined'}
                color={selectedDays.includes(day) ? 'primary' : 'default'} onClick={() => handleChip(day)} />
              ))}
              </FormGroup>}
              
            </Box>
            <Box>
              <Pickcolor selectColor={selectColor} setSelectColor={setSelectColor}/>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>閉じる</Button>
            <Button type="submit" value="submit" variant='contained'>追加</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default Form