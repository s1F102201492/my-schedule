import React from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import allLocales from '@fullcalendar/core/locales-all';
import { DateSelectArg } from '@fullcalendar/core/index.js';
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';

const Calendar = () => {
  const handleDateSelect = (selectionInfo: DateSelectArg) => {
    console.log('selectionInfo: ', selectionInfo); // 選択した範囲の情報をconsoleに出力
    const calendarApi = selectionInfo.view.calendar;
  
    calendarApi.unselect(); // 選択した部分の選択を解除
  };

  return (
    <div>
      <FullCalendar plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
      locales={allLocales} locale='ja'
      events={'https://fullcalendar.io/api/demo-feeds/events.json'}
      select={handleDateSelect}
      selectable={true}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek listWeek',
      }}
      />
    </div>
  )
}

export default Calendar