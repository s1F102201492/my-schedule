import * as React from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const TimeComponents = () => {
  return (
    <div>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DemoContainer components={['TimePicker', 'TimePicker', 'TimePicker']} >
                <DemoItem >
                <TimePicker views={['hours', 'minutes']} format='hh:mm' ampm={false} />
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    </div>
  )
}

export default TimeComponents