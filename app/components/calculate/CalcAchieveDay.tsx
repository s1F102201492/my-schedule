// ストリーク用の関数
// タスクを一日でも達成した日をカウント（タスクが存在しない日は除外）
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/ja'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale('ja')
dayjs.tz.setDefault('Asia/Tokyo')

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

export const CalcAchieveDay = (todos: TodoProps[]) => {
    // タスク完了をした日付を格納
    const map_Date = new Map();

    // 直近でタスクを連続で達成した日をカウント
    let cntStreak: number = 0;

    // タスクを達成していた日付をMapオブジェクトに格納
    for (const todo of todos) {
        Object.keys(todo.checkedDates).map((date) => {
            // 現在より前の日付のみ対象
            if (dayjs().isAfter(dayjs(date), 'day')) {
                if (todo.checkedDates[date] == true && map_Date.has(date)) {
                    // 日付がもうある　かつ　チェック済みのタスク
                    if (map_Date.get(date) == false) {
                        return map_Date.set(date, true);
                    }
                    
                    // trueで格納されているものがある場合は格納しない
                } else if (todo.checkedDates[date] == false && map_Date.has(date)) {
                    return ;

                } else {
                    // 日付がない場合は重複の可能性はないので格納
                    return map_Date.set(date, todo.checkedDates[date]);
                }

            } else { // 現在よりあとの日付は入れない
                return ;

            }

                

        })
    }
    
    // Mapオブジェクトと配列に変換
    const dateArray = Array.from(map_Date.keys())

    // comletedに格納されている日付を日付順に並べ替え
    const dateArray_Desc = 
    dateArray.sort((a, b) => dayjs(b).diff(dayjs(a)))

    // 日付順に並べ替えたものを再びMapオブジェクトに
    const map_Date_Desc = new Map();
    dateArray_Desc.forEach(date => {
        map_Date_Desc.set(date, map_Date.get(date))
    });
    console.log(map_Date_Desc)

    // 今日から遡って日付が途切れた場合カウント終了
    for (const val of map_Date_Desc.values()) {
        if (val == true) {
            cntStreak += 1
        } else {
            break;
        }
    }

    console.log("cntStreak: ", cntStreak)
  return cntStreak;
}
