import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ja";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import React from "react";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ja");
dayjs.tz.setDefault("Asia/Tokyo");

interface DateComponentsProps {
    label: string;
    date: Dayjs;
    setDate: React.Dispatch<React.SetStateAction<Dayjs>>;
    minDate: Dayjs;
    maxDate: Dayjs;
}

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
