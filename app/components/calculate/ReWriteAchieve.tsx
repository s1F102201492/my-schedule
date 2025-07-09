import { useState } from "react";
import { CalcAchieveDay } from "./CalcAchieveDay";
import { CalcAchieveCount } from "./CalcAchieveCount";
import { CalcMultiCount } from "./CalcMultiCount";

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

const rewrite_Achieve = async (achieve_d: number, achieve_t: number, achieve_m: number, userId: string) => {
  const res = await fetch(`/api/achievements/${userId}`, {
    method: 'PUT',
        body: JSON.stringify({
            achieve_d, achieve_t, achieve_m
        }),
        headers: {
            'Content-type': 'application/json',
        },
  })

  return res.json();
}

const ReWriteAchieve = ({ alltodos }: PropsType) => {
  // ストリーク機能
  const calc_d = CalcAchieveDay(alltodos);

  // 今までにチェックした数をカウント
  const calc_t = CalcAchieveCount(alltodos);

  // 一日の最大タスクチェック数をカウント
  const calc_m = CalcMultiCount(alltodos);

  
  

}

export default ReWriteAchieve