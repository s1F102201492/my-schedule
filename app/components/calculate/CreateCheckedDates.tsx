import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/ja'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale('ja')
dayjs.tz.setDefault('Asia/Tokyo')

const CreateCheckedDates = (sd: Dayjs, ed: Dayjs, interval: number | string[], selectedDays:string[] ) => {
    let objdate: Record<string, boolean> = {};
    if (typeof interval === 'number') {
        // 日ごとの場合
        let date = sd;
        // dateが終了日よりも前だった場合処理
        while (dayjs(date).isBefore(dayjs(ed)) || dayjs(date).isSame(ed)) {
            const slashdate = dayjs(date).format('YYYY/MM/DD');
            objdate[slashdate] = false;
            date = dayjs(date).add(interval, 'd');
        }
        return objdate;
    } else {
        // 曜日の場合
        let date = sd;
        while (dayjs(date).isBefore(dayjs(ed).add(1, 'd'))) {
            const day = dayjs(date).format('ddd');
            if (selectedDays.includes(day)) {
                const slashdate = dayjs(date).format('YYYY/MM/DD');
                objdate[slashdate] = false;
            }
            date = dayjs(date).add(1, 'd');
        }
        return objdate;
    }
}

export default CreateCheckedDates