import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/ja";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ja");
dayjs.tz.setDefault("Asia/Tokyo");

/**
 * 指定された期間と間隔（日数または曜日）に基づいて、タスクのチェック用オブジェクトを生成する関数
 * 生成される日付の値はすべて `false`（未完了）で初期化されます。
 * * @param {Dayjs} sd - 開始日
 * @param {Dayjs} ed - 終了日
 * @param {number | string[]} interval - 間隔（数値ならN日ごと、配列なら曜日["月", "水"など]）
 * @param {string[] | null} selectedDays - intervalが曜日の配列の場合に参照される選択曜日（実質interval引数と同じ役割で使われることが多い）
 * @returns {Record<string, boolean>} 日付文字列("YYYY/MM/DD")をキーとし、falseを値とするオブジェクト
 * * @example
 * // 3日ごとの場合
 * const start = dayjs("2023-01-01");
 * const end = dayjs("2023-01-07");
 * const dates = CreateCheckedDates(start, end, 3, null);
 * // 結果: { "2023/01/01": false, "2023/01/04": false, "2023/01/07": false }
 * * @example
 * // 毎週月曜の場合
 * const start = dayjs("2023-01-01"); // 日曜日
 * const end = dayjs("2023-01-07");
 * const dates = CreateCheckedDates(start, end, ["月"], ["月"]);
 * // 結果: { "2023/01/02": false } // 1/2は月曜日
 */
const CreateCheckedDates = (
    sd: Dayjs,
    ed: Dayjs,
    interval: number | string[],
    selectedDays: string[] | null,
) => {
    const objdate: Record<string, boolean> = {};
    if (typeof interval === "number") {
        // 日ごとの場合
        let date = sd;
        // dateが終了日よりも前だった場合処理
        while (dayjs(date).isBefore(dayjs(ed)) || dayjs(date).isSame(ed)) {
            const slashdate = dayjs(date).format("YYYY/MM/DD");
            objdate[slashdate] = false;
            date = dayjs(date).add(interval, "d");
        }
        return objdate;
    } else if (Array.isArray(interval)) {
        // 曜日の場合
        let date = sd;
        while (dayjs(date).isBefore(dayjs(ed).add(1, "d"))) {
            const day = dayjs(date).format("ddd");
            if (selectedDays!.includes(day)) {
                const slashdate = dayjs(date).format("YYYY/MM/DD");
                objdate[slashdate] = false;
            }
            date = dayjs(date).add(1, "d");
        }
        return objdate;
    } else {
        return objdate;
    }
};

export default CreateCheckedDates;
