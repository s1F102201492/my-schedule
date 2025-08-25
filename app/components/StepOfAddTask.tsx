import { Box, SelectChangeEvent, Step, StepLabel, Stepper } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { taglist } from './tags';

// フォーム（目的、タグ、タスクの難易度）を入力するとGPTがタスク名、内容、期間、間隔を出してくれる

const StepOfAddTask = () => {
  // ステップ数
  const [stepNum, setStepNum] = useState<number>(0);
  const steps = [
    'あなたのなりたい姿や目標を教えてください！どんなことでも構いません！',
    'あなたが頑張る期間を決めましょう！',
    '間隔はどのくらいにしますか？',
    'このタスクのタグを選択してください！',
  ];

  const handleStepNum = (next: boolean) => {
    if (next) { // 次に進む
      setStepNum(prevStepNum => prevStepNum + 1)
    } else {// 前に戻る
      setStepNum(prevStepNum => prevStepNum - 1)
    }
  }

  // 目的のフォーム
  const [purpose, setPurpose] = useState<string>('');
  const handleSetPurpose = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPurpose(e.target.value);
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

  // 期間のフォーム
  const [period, setPeriod] = useState<number>(0);
  const handleSetPeriod = () => {
    setPeriod();
  }

  // 間隔のフォーム（曜日やn日ごとなどあれば）
  // n日ごとの場合
  const numberofdays: number[] = [1, 2, 3, 4, 5, 6, 7];
  const [number, setNumber] = useState<number>(1);
  const handleNumber = (e: SelectChangeEvent<number>) => {
      const selectedNumber = Number(e.target.value);
      setNumber(selectedNumber);
  };

  // 曜日の場合
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const handleSetChip = (day: string) => {
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
        setNumber(1);
    }
  }, [ndays]);

  // タグの選択
  const tags = taglist
  const [tag, setTag] = useState<string>("");
  const handleTagSelect = (e: SelectChangeEvent) => { // 選択
      setTag(e.target.value as string)
  }

  const ViewContents = () => {
    if (stepNum == 0) {
      return (
        <div>
          {steps[0]}
        </div>
      )
    } else if (stepNum == 1) {
      return (
        <div>a</div>
      )
    } else if (stepNum == 2) {
      return (
        <div>a</div>
      )
    } else if (stepNum == 3) {
      return (
        <div>a</div>
      )
    }
  }

  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={stepNum} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {ViewContents()}
      </Box>

    </div>
  )
}

export default StepOfAddTask