/**
 * `checkedDates` オブジェクト内の達成済み（true）の日数をカウントする関数
 * * @param {Record<string, boolean>} checkedDates - 日付と達成状態のマップ
 * @returns {number} 達成済み（true）の日数
 * * @example
 * const dates = {
 * "2023/01/01": true,
 * "2023/01/02": false,
 * "2023/01/03": true
 * };
 * const count = CountContinueDays(dates); // 2
 */
export const CountContinueDays = (
    checkedDates: Record<string, boolean>,
): number => {
    const trueDays: string[] = [];
    for (const key in checkedDates) {
        if (checkedDates[key] === true) {
            trueDays.push(key);
        }
    }

    if (trueDays.length == 0) {
        return 0;
    } else {
        return trueDays.length;
    }
};
