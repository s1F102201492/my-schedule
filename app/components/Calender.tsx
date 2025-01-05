import React from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from '@fullcalendar/core/locales-all';

const Calender = () => {
  return (
    <div>
      <FullCalendar plugins={[dayGridPlugin]}
      locales={allLocales} locale='ja' />
    </div>
  )
}

export default Calender