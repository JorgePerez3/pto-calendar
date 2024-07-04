"use client";

import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Card } from '@/app/ui/dashboard/cards';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// Import other necessary components and styles

export default function Page() {
  const [value, setValue] = useState(dayjs('2024-07-30T15:30'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <main>
        <h1 className="mb-4 text-xl md:text-2xl">
        Dashboard
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          <Card title="Sick Hours" value="35" type="collected" />
          <Card title="Vacation Hours" value="80" type="pending" />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-6">
          <div>
            <h3 className="mb-4 text-md md:text-xl">Request PTO</h3>
            <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
            
          </div>
        </div>
      </main>
    </LocalizationProvider>
  );
}