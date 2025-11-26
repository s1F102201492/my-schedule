import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import React from "react";
import { DateComponentsProps } from "../Models/models";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ja");
dayjs.tz.setDefault("Asia/Tokyo");

/**
 * 日付選択用の共通コンポーネント
 * MUIのDatePickerをラップし、日本語ロケール設定などを適用しています。
 * * @component
 * @param {string} label - フォームのラベル（例: "開始日"）
 * @param {Dayjs | null} date - 現在選択されている日付
 * @param {function} setDate - 日付変更時のコールバック関数
 * @param {Dayjs} minDate - 選択可能な最小日付
 * @param {Dayjs} maxDate - 選択可能な最大日付
 */
export const DateComponents: React.FC<DateComponentsProps> = ({
    label,
    date,
    setDate,
    minDate,
    maxDate,
}) => {
    return (
        <div style={{ marginTop: 10 }}>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                dateFormats={{ year: "YYYY年" }} // カレンダー内の年一覧のフォーマット
            >
                <DatePicker
                    label={label}
                    minDate={minDate}
                    maxDate={maxDate}
                    value={date}
                    onChange={(newdate) => {
                        if (newdate) setDate(newdate);
                    }} //dayjs型
                    format='YYYY/MM/DD' // テキストエリア内のフォーマット
                    slotProps={{
                        textField: { required: true },
                        calendarHeader: { format: "YYYY年MM月" },
                    }} // カレンダーヘッダーのフォーマット
                />
            </LocalizationProvider>
        </div>
    );
};
