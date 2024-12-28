import { JSX } from '@emotion/react/jsx-runtime';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

dayjs.locale('ja'); // カレンダーの曜日のフォーマット

export const DateComponents = (): JSX.Element => {
  return (
    <div>
        <LocalizationProvider
        dateAdapter={AdapterDayjs}
        dateFormats={{ year: 'YYYY年' }} // カレンダー内の年一覧のフォーマット
        >
        <DatePicker
            label="YYYY/MM/DD"
            format="YYYY/MM/DD" // テキストエリア内のフォーマット
            slotProps={{ calendarHeader: { format: 'YYYY年MM月' } }} // カレンダーヘッダーのフォーマット
        />
        </LocalizationProvider>
    </div>
  );
};

