import { JSX } from '@emotion/react/jsx-runtime';
import { Margin } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

dayjs.locale('ja'); // カレンダーの曜日のフォーマット

export const DateComponents = (): JSX.Element => {
  return (
    <div style={{marginTop: 10}}>
        <LocalizationProvider
        dateAdapter={AdapterDayjs}
        dateFormats={{ year: 'YYYY年' }} // カレンダー内の年一覧のフォーマット
        >
        <DatePicker
            label="日付"
            format="YYYY/MM/DD" // テキストエリア内のフォーマット
            slotProps={{ textField: { required: true } ,
            calendarHeader: { format: 'YYYY年MM月' }}} // カレンダーヘッダーのフォーマット
            
        />
        </LocalizationProvider>
    </div>
  );
};

