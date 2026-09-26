import React from 'react';
import dayjs from 'dayjs';
import type { ExamSessionRes } from '@bac/contracts/schemas/examSession/response';
import { ExamCard } from './ExamCard';
import { CALENDAR_START_HOUR, CALENDAR_END_HOUR } from '../utils/calendarUtils';

interface CalendarGridProps {
  weekDays: dayjs.Dayjs[];
  examSessions: ExamSessionRes[];
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ weekDays, examSessions }) => {
  // 9 hour slots (8:00-9:00, ..., 16:00-17:00)
  const timeSlots = Array.from({ length: CALENDAR_END_HOUR - CALENDAR_START_HOUR }, (_, i) => CALENDAR_START_HOUR + i);

  const todayStr = dayjs().format('YYYY-MM-DD');

  // Group exams by day (YYYY-MM-DD)
  const examsByDate = React.useMemo(() => {
    const map = new Map<string, ExamSessionRes[]>();
    for (const session of examSessions) {
      const examDateStr = dayjs(session.exam.date).format('YYYY-MM-DD');
      if (!map.has(examDateStr)) {
        map.set(examDateStr, []);
      }
      map.get(examDateStr)!.push(session);
    }
    return map;
  }, [examSessions]);

  return (
    <div className='border-border bg-card overflow-x-auto rounded-xl border shadow-sm'>
      <div className='min-w-300'>
        {/* Days Header Row (X-Axis) */}
        <div className='border-border bg-muted/40 sticky top-0 z-20 grid grid-cols-[80px_repeat(6,1fr)] border-b text-xs font-medium backdrop-blur'>
          {/* Time column header */}
          <div className='border-border/60 text-muted-foreground flex items-center justify-center border-r py-3.5 font-semibold'>
            Time
          </div>

          {/* 6 Day Column Headers (Mon to Sat) */}
          {weekDays.map((day) => {
            const isToday = day.format('YYYY-MM-DD') === todayStr;
            return (
              <div
                key={day.toISOString()}
                className={`border-border/60 flex flex-col items-center justify-center border-r py-3 transition-colors last:border-r-0 ${
                  isToday ? 'bg-primary/5 text-primary font-semibold' : 'text-foreground'
                }`}
              >
                <span className='text-muted-foreground text-xs tracking-wider uppercase'>{day.format('dddd')}</span>
                <span
                  className={`mt-1 flex h-7 w-7 items-center justify-center rounded-full text-xs transition-colors ${
                    isToday ? 'bg-primary text-primary-foreground font-bold shadow-sm' : 'hover:bg-muted font-medium'
                  }`}
                >
                  {day.format('D')}
                </span>
              </div>
            );
          })}
        </div>

        {/* Calendar Time Grid Body (Y-Axis & Cells) */}
        <div className='bg-background/50 relative grid grid-cols-[80px_repeat(6,1fr)] pt-4'>
          {/* Time labels column */}
          <div className='border-border/60 bg-muted/15 relative border-r select-none'>
            {timeSlots.map((hour) => {
              const formattedHour = `${hour.toString().padStart(2, '0')}:00`;
              return (
                <div key={hour} className='border-border/40 relative h-32 border-b'>
                  <span className='text-muted-foreground absolute -top-2.5 right-3 text-xs font-medium'>
                    {formattedHour}
                  </span>
                  {/* Half-hour marker */}
                  <div className='text-muted-foreground/40 absolute top-16 right-2 font-mono text-[10px]'>:30</div>
                </div>
              );
            })}
          </div>

          {/* 6 Days Event Columns */}
          {weekDays.map((day) => {
            const dayKey = day.format('YYYY-MM-DD');
            const daySessions = examsByDate.get(dayKey) || [];
            const isToday = dayKey === todayStr;

            return (
              <div
                key={dayKey}
                className={`border-border/50 relative border-r last:border-r-0 ${isToday ? 'bg-primary/[0.02]' : ''}`}
              >
                {/* Background hour grid lines */}
                {timeSlots.map((hour) => (
                  <div key={hour} className='border-border/30 relative h-32 border-b'>
                    {/* Subtle half-hour dashed guideline */}
                    <div className='border-border/20 absolute inset-x-0 top-16 border-b border-dashed' />
                  </div>
                ))}

                {/* Exam Cards placed proportionally */}
                {daySessions.map((session) => (
                  <ExamCard key={session.sessionId || session.exam.id} session={session} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
