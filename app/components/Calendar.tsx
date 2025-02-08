import React, { useContext } from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import allLocales from '@fullcalendar/core/locales-all';
import { DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core';
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import { TodoContext } from './TodoContext';

interface CalendarViewProps {
  title: string;
  start: string;
  end: string;
  color: string;
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

  const todolist: CalendarViewProps[] = todos.flatMap((todo) => 
    Object.keys(todo.checkedDates).map((dateKey) => ({
      title: todo.title,
      start: new Date(dateKey).toISOString(), // 各 checkedDate のキー（日付）を start に設定
      end: new Date(dateKey).toISOString(), // start と同じ値を設定（変更が必要なら修正）
      color: todo.color
    }))
  );

  return (
    <div>
      <FullCalendar plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
      locales={allLocales} locale='ja'
      events={todolist}
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