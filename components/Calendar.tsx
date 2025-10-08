import React, { useState } from 'react';

type IndicatorType = 'important' | 'urgent' | 'combined' | 'none';

interface CalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  highlightToday?: boolean;
  taskIndicators?: Record<string, IndicatorType[]>;
  disablePastDates?: boolean;
}

// Helper functions for SVG arc
function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string {
  if (endAngle - startAngle >= 360) {
      endAngle = startAngle + 359.99;
  }
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  const d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');
  return d;
}

const getIndicatorColor = (indicator: IndicatorType): string => {
    switch (indicator) {
        case 'important': return '#22c55e'; // green-500
        case 'urgent': return '#3b82f6'; // blue-500
        case 'combined': return '#ef4444'; // red-500
        default: return '#94a3b8'; // slate-400
    }
};

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect, highlightToday = true, taskIndicators = {}, disablePastDates = false }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  
  const daysInMonth = lastDayOfMonth.getDate();
  const startDay = firstDayOfMonth.getDay(); // 0 for Sunday

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  
  const calendarDays = [];
  // Add empty cells for days before the start of the month
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(<div key={`empty-start-${i}`} className="p-2 h-10"></div>);
  }

  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDate = new Date(year, month, day);
    const dayString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    const isToday = dayDate.getTime() === today.getTime();
    const isPast = dayDate < today;
    const isSelected = selectedDate === dayString;
    const indicators = taskIndicators[dayString];

    const canClick = !(disablePastDates && isPast);
    
    calendarDays.push(
      <div 
        key={day} 
        onClick={() => canClick && onDateSelect(dayString)}
        className={`relative p-2 text-center rounded-full flex items-center justify-center transition-colors duration-200 w-10 h-10 mx-auto
          ${isSelected 
            ? 'bg-teal-500 text-white font-bold' 
            : isToday && highlightToday
            ? 'bg-orange-500 text-white font-bold' 
            : !canClick
            ? 'text-slate-300 cursor-not-allowed'
            : 'hover:bg-teal-100 cursor-pointer'}`}
      >
        {indicators && indicators.length > 0 && !isSelected && (
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 40 40">
            {indicators.map((indicator, index) => {
              const total = indicators.length;
              const gap = total > 1 ? 5 : 0; // Gap in degrees
              const segment = 360 / total;
              const startAngle = index * segment;
              const endAngle = startAngle + segment - gap;
              
              const pathData = describeArc(20, 20, 17.5, startAngle, endAngle);
              
              return (
                <path
                  key={index}
                  d={pathData}
                  stroke={getIndicatorColor(indicator)}
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
        )}
        <span className="relative z-10">{day}</span>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-2 rounded-full hover:bg-slate-100 transition-colors" aria-label="Bulan sebelumnya">
          <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-xl font-bold text-teal-600">
          {monthNames[month]} {year}
        </h2>
        <button onClick={nextMonth} className="p-2 rounded-full hover:bg-slate-100 transition-colors" aria-label="Bulan berikutnya">
          <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
        {daysOfWeek.map(day => <div key={day}>{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-y-4 mt-3">
        {calendarDays}
      </div>
    </div>
  );
};

export default Calendar;