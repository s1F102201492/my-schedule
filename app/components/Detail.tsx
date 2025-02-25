'use client';

import { Box, Button, Card, CardContent, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, LinearProgress, Typography } from '@mui/material'
import React from 'react'
import Edit from './Edit';
import Delete from './Delete';
import CheckIcon from '@mui/icons-material/Check';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { CheckRate } from './calculate/CheckRate';

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
    onClose: () => void;
};

const Detail:React.FC<TodoItemProps> = ({ todo, onClose }) => {

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

    const slashstart = todo.startdate.split('T')[0].replace(/-/g, "/");
    const slashend = todo.enddate.split('T')[0].replace(/-/g, "/");
      
  return (
    <div>
      {/* フォーム全体をフォームタグで囲む */}
      <DialogTitle sx={{m: 1}}></DialogTitle>
        <DialogContent>
          <Grid2 size={{xs: 12}}>
            <Typography variant="h4" component="h1" gutterBottom>
              {todo.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {descriptionnull(todo.description) ? todo.description : "詳細なし"}
            </Typography>
          </Grid2>

          {/* 期間情報 */}
          <Grid2 container spacing={2}>
            <Grid2 size={{xs: 12, sm: 6}} sx={{mt: 2, mb:1}}>
            <Typography variant="subtitle2" color="text.secondary">
                開始日
            </Typography>
            <Typography variant="body1" gutterBottom>
                {slashstart}
            </Typography>
            </Grid2>
            <Grid2 size={{xs: 12, sm: 6}} sx={{mt: 2, mb:1}}>
            <Typography variant="subtitle2" color="text.secondary">
                終了日
            </Typography>
            <Typography variant="body1" gutterBottom>
                {slashend}
            </Typography>
            </Grid2>
          </Grid2>

          {/* 間隔 */}
          <Grid2 size={{xs: 12, sm: 6}} sx={{my:1}}>
          <Typography variant="subtitle2" color="text.secondary">
              間隔
          </Typography>
          <Typography variant="body1" gutterBottom>
              {intervaltype(todo.interval) ? `${todo.interval}日ごと` : `曜日：${todo.interval}`}
          </Typography>
          </Grid2>

          <Box sx={{my: 4}}>
              <Grid2 size={{xs: 12}}>
              <Typography variant="subtitle2" color="text.secondary">
                  達成率
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <LinearProgress
                  variant="determinate"
                  value={CheckRate(todo)}
                  sx={{ flexGrow: 1, height: 10, borderRadius: 5 }}
                  />
                  <Typography variant="body2">{CheckRate(todo)}%</Typography>
              </Box>
              </Grid2>
          </Box>

          <Grid2 size={{xs: 12}}>
            <Typography variant="h6" gutterBottom>
              達成状況
            </Typography>
            <Grid2 container spacing={2}>
              {Object.entries(todo.checkedDates).map((date, key) => (
                <Grid2 size={{xs: 6, md: 4}} key={key}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="body1">{date[0]}</Typography>
                        <Chip
                          icon={date[1] ? <CheckIcon /> : <HighlightOffIcon />}
                          label={date[1] ? "達成" : "未達成"}
                          color={date[1] ? "success" : "error"}
                          size="small"
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
          </Grid2>
        </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>閉じる</Button>
        <Edit id={todo.id} todo={todo} />
        <Delete onetodo={todo} />
      </DialogActions>
    </div>
  )
}

export default Detail