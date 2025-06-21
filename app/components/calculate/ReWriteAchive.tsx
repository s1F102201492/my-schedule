import { useState } from "react";

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

const rewrite_Achive = async (achive_d: number, achive_t: number, achive_m: number, userId: string) => {
  const res = await fetch(`/api/achivements/${userId}`, {
    method: 'PUT',
        body: JSON.stringify({
            achive_d, achive_t, achive_m
        }),
        headers: {
            'Content-type': 'application/json',
        },
  })

  return res.json();
}

const ReWriteAchive = ({ alltodos }: PropsType) => {
  

  // 今までにチェックした数をカウント
  const [task_Counter, setTask_Counter] = useState<number>(0);

  // 一日の最大タスクチェック数をカウント
  const [multi_Task, setMulti_Task] = useState<number>(0);

  let calc_Variable = new Set<string>([]);

}

export default ReWriteAchive