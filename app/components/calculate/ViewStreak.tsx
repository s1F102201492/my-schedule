// ストリーク用の関数
// タスクを一日でも達成した日をカウント（タスクが存在しない日は除外）
import React, { useState } from "react";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/ja'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale('ja')
dayjs.tz.setDefault('Asia/Tokyo')

interface todoProps {
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

interface PropsType {
    alltodos: todoProps[];
}

const ViewStreak: React.FC<PropsType> = ({ alltodos }) => {
    let cntStreak: number = 0;
    let completed = new Set<string>([]);

    // タスクを達成していた日付を格納
    for (const todo of alltodos) {
      Object.keys(todo.checkedDates).map((date) => {
        if (todo.checkedDates[date] == true) {
          completed.add(date);
        }

      })
    }

    const completedArray = Array.from(completed)

    // comletedに格納されている日付を日付順に並べ替え
    const completedArray_Desc = 
    completedArray.sort((a, b) => dayjs(b).diff(dayjs(a)))

    // 今日から遡って日付が途切れた場合カウント終了
    for (let i = 0; i < completedArray_Desc.length; i++) {
      const current = dayjs(completedArray_Desc[i]);
      const next = dayjs(completedArray_Desc[i+1]);

      if (!next) {
        break;
      } else if (!current) {
        break;
      } else {
        if (current.add(1, 'm') == next) {
          cntStreak += 1;
        }
      }
    }

  return (
    <div>
      {cntStreak}
    </div>
  )
}

export default ViewStreak