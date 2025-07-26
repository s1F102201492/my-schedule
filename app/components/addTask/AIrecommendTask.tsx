import { Box, SelectChangeEvent, Step, StepLabel, Stepper } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { taglist } from '../tags';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';
import CreateCheckedDates from '../calculate/CreateCheckedDates';
import { AuthContext } from '../../context/AuthContext';
import { TodoContext } from '../../context/TodoContext';

interface GPTOutputProps {
    title: string,
    description: string,
    startdate: string,
    enddate: string,
    interval: number | string[],
    tag: string
}

// 入力されたもの（目標、タグ、難易度など）をGPTがタスクとして返す
const GPTOutput = async (
    purpose: string,
    img: string | null,
    tag: string,
    level: string
) => {
    const res = await fetch(`api/chatgpt`, {
        method: 'POST',
        body: JSON.stringify({
            purpose, img, tag, level
        }),
        headers: {
            'Content-type': 'application/json',
        }
    })

    return res.json();
} 

// タスクをデータベースに追加する関数
const addTodo = async (
    title: string,
    description: string,
    continuedays: number,
    checkedDates: Record<string, boolean>,
    startdate: string,
    enddate: string,
    interval: number | string[],
    purpose: string,
    tag: string,
    userId: string
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
            purpose,
            tag,
            userId
        }),
        headers: {
            'Content-type': 'application/json',
        },
    });

    return res.json();
};

// フォーム（目的、タグ、タスクの難易度）を入力するとGPTがタスク名、内容、期間、間隔を出してくれる

const AIrecommendTask = () => {

    const todoContext = useContext(TodoContext);

    if (!todoContext) {
        throw new Error(
            'TodoContext is undefined. Make sure to use TodoProvider.',
        );
    }

    const { fetchAllTodos } = todoContext;

    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error(
            'TodoContext is undefined. Make sure to use TodoProvider.',
        );
    }

    const { loginUser } = authContext;

    const router = useRouter();

  // タイトル
  const [title, setTitle] = useState<string>('');
  const handletitle = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
  };

  // 詳細テキスト
  const [desc, setdesc] = useState<string>('');
  const handledesc = (e: React.ChangeEvent<HTMLInputElement>) => {
      setdesc(e.target.value);
  };

  // 日付フォームをStateで管理（sdがstartdate,edがenddate）
  const [sd, setSd] = useState<Dayjs>(dayjs()); //Date型
  const [ed, setEd] = useState<Dayjs>(dayjs()); //Date型

  // n日ごとの場合
  const numberofdays: number[] = [1, 2, 3, 4, 5, 6, 7];
  const [num, setNum] = useState<number>(1);
  const handleNumber = (interval: number) => {
      setNum(interval);
  };

  // 目的のフォーム
  const [purp, setPurp] = useState<string>('');
  const handleSetPurpose = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPurp(e.target.value);
  };

  // 画像があればセット
  const [img, setImg] = useState<string>('');
  const handleSetImg = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onloadend = () => {
          setImg(reader.result as string); // Base64 データをセット
      };
      reader.readAsDataURL(file);

      e.target.value = ''; // inputのリセット
  };

  const resetImg = () => {
    setImg('');
  }

  // タグの選択
  const tags = taglist
  const [tag, setTag] = useState<string>("");
  const handleTagSelect = (e: SelectChangeEvent) => { // 選択
      setTag(e.target.value as string)
  }

  const formReset = () => {
    setTitle('');
    setSd(dayjs());
    setEd(dayjs());
    setNum(1);
    setPurp('');
    setTag("");
    };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const checkdates: Record<string, boolean> = CreateCheckedDates(
        sd,
        ed,
        num,
        null
    ); // 日付: falseの辞書を作成

    const contdays: number = 0; // continuedays 登録したてなので最初は0

    await addTodo(
        title,
        desc,
        contdays,
        checkdates,
        sd?.format('YYYY/MM/DD'),
        ed?.format('YYYY/MM/DD'),
        num,
        purp,
        tag,
        loginUser!.id
    );

    await fetchAllTodos();
    router.push(locate);
    router.refresh();
    setOpen(false);
    formReset();
};

  return (
    <div>
      <Box sx={{ width: '100%' }}>
        
      </Box>

    </div>
  )
}

export default AIrecommendTask