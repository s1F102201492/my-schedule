// １日の最大タスク数をカウントする関数
interface TodoProps {
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

export const CalcMultiCount = (alltodos: TodoProps[]) => {
    let resultObj: Record<string, number> = {};
    
    const completedDays = alltodos.map((todo) => {
      return (Object.keys(todo.checkedDates).filter((date) => {
        return todo.checkedDates[date] === true
      }))
    })
    
    // 二次元配列などで同じ日付のものをかためる
    for (const element of completedDays) {
      for (const day of element) {
        if (day in resultObj) {
          resultObj[day] += 1;
        } else {
          resultObj[day] = 1;
        }
      }
    }

    // 一日の最大タスク数
    const multiday_Max = Object.values(resultObj).reduce((a, b) => Math.max(a, b), -Infinity);

    // それぞれの配列の長さを出す
    return multiday_Max;
}