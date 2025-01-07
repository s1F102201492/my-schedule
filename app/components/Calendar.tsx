import React from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import allLocales from '@fullcalendar/core/locales-all';
import { DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core';
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';

const Calendar = () => {
  const handleDateSelect = (selectionInfo: DateSelectArg) => {
    console.log('selectionInfo: ', selectionInfo); // 選択した範囲の情報をconsoleに出力
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event: EventApi = clickInfo.event;
    alert('イベントタイトル: ' + event.title + '\n詳細: ' + (event.extendedProps.description || '説明はありません'));
  };
  
  return (
    <div>
      <FullCalendar plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
      locales={allLocales} locale='ja'
      events={'https://fullcalendar.io/api/demo-feeds/events.json'}
      select={handleDateSelect}
      selectable={true}
      eventClick={handleEventClick}
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