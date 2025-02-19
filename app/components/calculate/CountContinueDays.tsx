// 今日のタスクが何日目かをカウントする関数(達成した日のみカウント)

export const CountContinueDays = (checkedDates: Record<string, boolean>): number => {
    let trueDays:string[] = []
    for (const key in checkedDates) {
        if (checkedDates[key] === true) {
            trueDays.push(key);
        }
    }
    
    if (trueDays.length == 0) {
        return 0
    } else {
        return trueDays.length
    }
};
