'use client';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import React, { useState } from 'react'
import Edit from './Edit';
import Delete from './Delete';

interface TodoProps {
    id: number;
    title: string;
    description: string;
    continuedays: number;
    checkedDates: Record<string, boolean>;
    startdate: string;
    enddate: string;
    interval: number | string[]; 
    color: string;
    // intervalには数字か配列（曜日を格納する）
  };
  
interface TodoItemProps {
    todo: TodoProps;
};

const Detail:React.FC<TodoItemProps> = ({ todo }) => {
    const [open, setOpen] = useState<boolean>(false);
      const handleClickOpen = () => setOpen(true);
      const handleClose = () => { //閉じたらすべてリセット
        setOpen(false);
      }

    const descriptionnull = (description:string | null) => {
        if (description === 'string') { //詳細が書かれている場合はtrue,ない場合はfalse
            return true;
        } else {
            return false;
        }
    }

    const intervaltype = (interval: number | string[]) => {
        if (typeof(interval) === 'number') { //日数はtrue,曜日はfalse
            return true;
        } else {
            return false;
        }
    }

    const checkrate = () => { // 達成率を求める(%表示で小数第２位で四捨五入)
        const checkcount = todo.continuedays;
        const totalcount = Object.keys(todo.checkedDates).length;
        return Math.round((checkcount / totalcount) * 1000) / 10
    }
      
  return (
    <div>
        <Button variant="outlined" onClick={handleClickOpen}>
        詳細
      </Button>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}>
          {/* フォーム全体をフォームタグで囲む */}
          <DialogTitle sx={{m: 1}} variant='h5'>{todo.title}</DialogTitle>
          <DialogContent>
            <Typography>
                詳細:{descriptionnull(todo.description) ? todo.description : 'なし' }
            </Typography>
            <Typography>
                開始日:{todo.startdate}
            </Typography>
            <Typography>
                終了日:{todo.enddate}
            </Typography>
            <Typography>
                間隔:{intervaltype(todo.interval) ? todo.interval+'日ごと' : '曜日:'+todo.interval}
            </Typography>
            <Typography>
                {todo.continuedays}日達成
            </Typography>
            <Typography>
                達成率:{checkrate()}％
                {/* 達成率はバーで表示したほうが見やすい？ */}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>閉じる</Button>
            <Edit id={todo.id} todo={todo} />
            <Delete onetodo={todo} />
          </DialogActions>
      </Dialog>
    </div>
  )
}

export default Detail