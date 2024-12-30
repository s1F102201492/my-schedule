'use client'

import * as React from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Dayjs } from 'dayjs';

interface checkTimeProps {
  checktime: boolean;
}

const TimeComponents:React.FC<checkTimeProps> = ({checktime}) => {
  const [selectTime, setSelectTime] = React.useState<Dayjs | null>(null)

  React.useEffect(() => {
    if (checktime === true) {
      setSelectTime(null);
    }
  },[checktime])

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DemoContainer components={['TimePicker', 'TimePicker', 'TimePicker']} >
          <DemoItem >
          <TimePicker views={['hours', 'minutes']} format='HH:mm'
          ampm={false} disabled={checktime}
          value={selectTime}
          onChange={(newValue) => {setSelectTime(newValue)}}/>
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  )
}

export default TimeComponents