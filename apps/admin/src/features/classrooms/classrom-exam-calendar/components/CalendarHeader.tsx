import React from 'react';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Edit3 } from 'lucide-react';

interface CalendarHeaderProps {
  currentWeekStart: dayjs.Dayjs;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onToday: () => void;
  examCount: number;
  onEditExams?: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentWeekStart,
  onPrevWeek,
  onNextWeek,
  onToday,
  examCount,
  onEditExams,
}) => {
  const currentWeekEnd = currentWeekStart.add(5, 'day'); // Monday to Saturday
  const sameMonth = currentWeekStart.month() === currentWeekEnd.month();
  const sameYear = currentWeekStart.year() === currentWeekEnd.year();

  let dateRangeText = '';
  if (sameMonth && sameYear) {
    dateRangeText = `${currentWeekStart.format('MMM D')} – ${currentWeekEnd.format('D, YYYY')}`;
  } else if (sameYear) {
    dateRangeText = `${currentWeekStart.format('MMM D')} – ${currentWeekEnd.format('MMM D, YYYY')}`;
  } else {
    dateRangeText = `${currentWeekStart.format('MMM D, YYYY')} – ${currentWeekEnd.format('MMM D, YYYY')}`;
  }

  return (
    <div className='border-border/60 flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between'>
      {/* Week navigation & Title */}
      <div className='flex flex-wrap items-center gap-3'>
        <div className='border-border bg-card flex items-center gap-1 rounded-lg border p-1 shadow-sm'>
          <Button
            variant='ghost'
            size='icon'
            onClick={onPrevWeek}
            className='hover:bg-muted h-8 w-8'
            title='Previous Week'
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <Button variant='ghost' size='sm' onClick={onToday} className='hover:bg-muted h-8 px-2.5 text-xs font-medium'>
            Today
          </Button>
          <Button variant='ghost' size='icon' onClick={onNextWeek} className='hover:bg-muted h-8 w-8' title='Next Week'>
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>

        <div className='flex items-center gap-2'>
          <div className='bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-lg'>
            <CalendarIcon className='h-4 w-4' />
          </div>
          <div>
            <h2 className='text-foreground text-sm font-semibold tracking-tight'>{dateRangeText}</h2>
            <p className='text-muted-foreground text-[11px]'>
              {examCount} {examCount === 1 ? 'exam session' : 'exam sessions'} scheduled this week
            </p>
          </div>
        </div>
      </div>

      {/* Action button at top */}
      <div className='flex items-center gap-2'>
        <Button
          type='button'
          onClick={onEditExams}
          className='bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer gap-2 shadow-sm transition-colors'
        >
          <Edit3 className='h-4 w-4' />
          <span>Edit Classroom Exams</span>
        </Button>
      </div>
    </div>
  );
};
