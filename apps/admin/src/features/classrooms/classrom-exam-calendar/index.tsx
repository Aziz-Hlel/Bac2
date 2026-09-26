import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Navigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import z from 'zod';

import classroomService from '@/Api/service/classroomService';
import { useCurrentSchool } from '@/contexts/CurrentSchoolContext';
import { useClassroomStore } from '@/store/useClassroomStore';
import BreadcrumbHeader from '@/pages/Header';

import { CalendarHeader } from './components/CalendarHeader';
import { CalendarGrid } from './components/CalendarGrid';
import { CalendarSkeletons } from './components/CalendarSkeletons';
import { UpdateClassroomExamsDialog } from './dialogs/update-classroom-exams';
import { getWeekDays } from './utils/calendarUtils';
import { AlertCircle, CalendarX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ClassroomExamCalendar: React.FC = () => {
  const schoolId = useCurrentSchool();
  const currentClassroom = useClassroomStore((state) => state.currentClassroom);
  const { classroomId } = useParams();

  // Validate classroomId uuid format
  const parsed = z.uuid().safeParse(classroomId);
  const validClassroomId = parsed.success ? parsed.data : '';

  // Current viewed week start (Monday)
  const [currentWeekStart, setCurrentWeekStart] = useState<dayjs.Dayjs>(() => {
    return getWeekDays(dayjs())[0];
  });

  const [hasAutoJumped, setHasAutoJumped] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  // Fetch classroom exams
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['classrooms', schoolId, validClassroomId, 'exams'],
    queryFn: () => classroomService.getExams({ schoolId, id: validClassroomId }),
    enabled: Boolean(schoolId && validClassroomId),
  });

  const examSessions = useMemo(() => data?.data ?? [], [data]);

  // Default jump to earliest exam week once fetched
  useEffect(() => {
    if (!hasAutoJumped && examSessions.length > 0) {
      // Find earliest exam date
      const sortedExams = [...examSessions].sort((a, b) => dayjs(a.exam.date).valueOf() - dayjs(b.exam.date).valueOf());
      const earliestDate = sortedExams[0]?.exam.date;
      if (earliestDate) {
        const weekStart = getWeekDays(dayjs(earliestDate))[0];
        setCurrentWeekStart(weekStart);
      }
      setHasAutoJumped(true);
    }
  }, [examSessions, hasAutoJumped]);

  // Generate the 6 days of current week (Mon-Sat)
  const weekDays = useMemo(() => getWeekDays(currentWeekStart), [currentWeekStart]);

  // Filter exam sessions occurring within the current week
  const currentWeekSessions = useMemo(() => {
    const mondayStr = weekDays[0].format('YYYY-MM-DD');
    const saturdayStr = weekDays[5].format('YYYY-MM-DD');

    return examSessions.filter((session) => {
      const examDateStr = dayjs(session.exam.date).format('YYYY-MM-DD');
      return examDateStr >= mondayStr && examDateStr <= saturdayStr;
    });
  }, [examSessions, weekDays]);

  // Navigation handlers
  const handlePrevWeek = () => {
    setCurrentWeekStart((prev) => prev.subtract(1, 'week'));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart((prev) => prev.add(1, 'week'));
  };

  const handleToday = () => {
    setCurrentWeekStart(getWeekDays(dayjs())[0]);
  };

  if (!parsed.success) {
    return <Navigate to='/classrooms' replace />;
  }

  const breadcrumbs = [
    { title: 'Classrooms', href: '/classrooms' },
    ...(currentClassroom ? [{ title: currentClassroom.name }] : []),
    { title: 'Exam Calendar', href: `/classrooms/${classroomId}/calendar` },
  ];

  return (
    <div className='bg-background flex min-h-screen flex-col'>
      <BreadcrumbHeader breadcrumbs={breadcrumbs} />

      <main className='mx-auto w-full flex-1 space-y-6 p-4 md:p-6 lg:p-8'>
        {isLoading ? (
          <CalendarSkeletons />
        ) : isError ? (
          <div className='border-destructive/30 bg-destructive/5 space-y-3 rounded-xl border p-6 text-center'>
            <div className='bg-destructive/10 text-destructive inline-flex h-10 w-10 items-center justify-center rounded-full'>
              <AlertCircle className='h-5 w-5' />
            </div>
            <div>
              <p className='text-destructive font-semibold'>Failed to load exam sessions</p>
              <p className='text-muted-foreground mt-1 text-xs'>
                {(error as Error)?.message || 'An unexpected error occurred while loading exams.'}
              </p>
            </div>
            <Button variant='outline' size='sm' onClick={() => refetch()}>
              Try again
            </Button>
          </div>
        ) : (
          <div className='space-y-6'>
            <CalendarHeader
              currentWeekStart={currentWeekStart}
              onPrevWeek={handlePrevWeek}
              onNextWeek={handleNextWeek}
              onToday={handleToday}
              examCount={currentWeekSessions.length}
              onEditExams={() => setIsEditDialogOpen(true)}
            />

            {examSessions.length === 0 ? (
              <div className='border-border/80 bg-card/50 flex flex-col items-center justify-center rounded-xl border border-dashed p-12 text-center'>
                <div className='bg-muted text-muted-foreground mb-3 flex h-12 w-12 items-center justify-center rounded-full'>
                  <CalendarX className='h-6 w-6' />
                </div>
                <h3 className='text-foreground text-sm font-semibold'>No exam sessions scheduled</h3>
                <p className='text-muted-foreground mt-1 max-w-sm text-xs'>
                  There are currently no exams provisioned for this classroom. Click "Edit Classroom Exams" to assign
                  exams.
                </p>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={() => setIsEditDialogOpen(true)}
                  className='mt-4 text-xs'
                >
                  Assign Exams Now
                </Button>
              </div>
            ) : (
              <CalendarGrid weekDays={weekDays} examSessions={currentWeekSessions} />
            )}
          </div>
        )}

        {isEditDialogOpen && (
          <UpdateClassroomExamsDialog
            onClose={() => setIsEditDialogOpen(false)}
            currentExams={examSessions}
            classroomId={validClassroomId}
          />
        )}
      </main>
    </div>
  );
};

export default ClassroomExamCalendar;
