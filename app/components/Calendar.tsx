import React, { useContext } from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import allLocales from '@fullcalendar/core/locales-all';
import { DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core';
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import { TodoContext } from './TodoContext';
import './calendar.css'

interface CalendarViewProps {
  title: string;
  start: string;
  end: string;
  checkdates: string[];
}

const Calendar = () => {
  const todoContext = useContext(TodoContext);

  if (!todoContext) {
    throw new Error('TodoContext is undefined. Make sure to use TodoProvider.');
  }

  const { todos } = todoContext;

  const handleDateSelect = (selectionInfo: DateSelectArg) => {
    console.log('selectionInfo: ', selectionInfo); // 選択した範囲の情報をconsoleに出力
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event: EventApi = clickInfo.event;
    alert('イベントタイトル: ' + event.title + '\n詳細: ' + (event.extendedProps.description || '説明はありません'));
  };

  const todolist:CalendarViewProps[] = todos.map((todo) =>({
    title: todo.title,
    start: new Date(todo.startdate).toISOString(),
    end: new Date(todo.enddate).toISOString(),
    checkdates: Object.keys(todo.checkedDates)
  }))

  return (
    <div>
      <FullCalendar plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
      locales={allLocales} locale='ja'
      events={todolist}
      dayCellContent={(arg) => {
        // その日のイベントがあるか判定
        const hasEvent = todolist.some((event) => {
          event.checkdates.some((date) => date === arg.date.toISOString().split('T')[0])
            }
          );

        return hasEvent
          && `<div style="text-align:center; font-size: 20px;">●</div>`
        }}
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