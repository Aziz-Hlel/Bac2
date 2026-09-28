import React from 'react';
import type { ExamSessionRes } from '@bac/contracts/schemas/examSession/response';
import { computeEventPosition, formatSubject, ROLE_COLORS, ROLE_LABELS, sortSupervisors } from '../utils/calendarUtils';
import { Clock, AlertCircle, UserCheck } from 'lucide-react';

interface ExamCardProps {
  session: ExamSessionRes;
}

export const ExamCard: React.FC<ExamCardProps> = ({ session }) => {
  const { exam, supervisors } = session;
  const { topPct, heightPct } = computeEventPosition(exam.startTime, exam.endTime);
  const sortedSupervisors = sortSupervisors(supervisors as any);
  const hasSupervisors = sortedSupervisors.length > 0;

  return (
    <div
      style={{
        top: `${topPct}%`,
        height: `${heightPct}%`,
      }}
      className='group border-primary/25 bg-card/95 hover:border-primary/50 absolute inset-x-2 z-10 flex flex-col overflow-hidden rounded-xl border p-3.5 shadow-sm backdrop-blur-md transition-all duration-200 hover:z-20 hover:shadow-lg'
    >
      {/* Accent left gradient bar */}
      <div className='from-primary via-primary/80 to-primary/40 absolute top-0 bottom-0 left-0 w-1.5 rounded-l bg-linear-to-b' />

      {/* Header: Subject & Time */}
      <div className='flex items-start justify-between gap-2 pl-1.5'>
        <div className='min-w-0 flex-1'>
          <h4 className='text-foreground truncate text-sm font-bold tracking-tight' title={exam.subject}>
            {formatSubject(exam.subject)}
          </h4>
          {exam.major?.name && (
            <div className='mt-0.5 flex items-center'>
              <span className='bg-primary/10 text-primary ring-primary/20 inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-medium ring-1 ring-inset'>
                {exam.major.name}
              </span>
            </div>
          )}
          <div className='text-muted-foreground mt-1 flex items-center gap-1.5 text-xs font-medium'>
            <Clock className='text-primary/80 h-3.5 w-3.5 shrink-0' />
            <span>
              {exam.startTime.slice(0, 5)} - {exam.endTime.slice(0, 5)}
            </span>
            {exam.term && (
              <span className='bg-muted py-0.2 text-muted-foreground ml-1 rounded px-1.5 text-[10px] font-semibold uppercase'>
                {exam.term}
              </span>
            )}
          </div>
        </div>

        {exam.isOptional && (
          <span className='shrink-0 rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400'>
            Optional
          </span>
        )}
      </div>

      {/* Supervisors section */}
      <div className='scrollbar-thin scrollbar-thumb-muted/40 mt-3 flex-1 space-y-2 overflow-y-auto pr-0.5 pl-1.5'>
        <div className='text-muted-foreground flex items-center gap-1.5 text-[11px] font-semibold'>
          <UserCheck className='text-primary/70 h-3.5 w-3.5 shrink-0' />
          <span>Supervisors ({sortedSupervisors.length}):</span>
        </div>

        {hasSupervisors ? (
          <div className='space-y-1.5'>
            {sortedSupervisors.map((supervisor) => {
              const roleMeta = ROLE_COLORS[supervisor.role] ?? ROLE_COLORS.SECONDARY;
              const roleLabel = ROLE_LABELS[supervisor.role] ?? supervisor.role;

              return (
                <div
                  key={`${supervisor.id}-${supervisor.role}`}
                  className='bg-muted/50 hover:bg-muted/80 border-border/40 flex items-center justify-between gap-2 rounded-lg border px-2.5 py-1.5 text-xs transition-colors'
                >
                  <span
                    className='text-foreground truncate text-xs font-medium'
                    title={`${supervisor.firstName} ${supervisor.lastName}`}
                  >
                    {supervisor.firstName} {supervisor.lastName}
                  </span>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2 py-0.5 text-[10px] font-semibold ${roleMeta.badge}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${roleMeta.dot}`} />
                    {roleLabel}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className='inline-flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/10 px-2.5 py-1.5 text-xs font-medium text-amber-600 dark:text-amber-400'>
            <AlertCircle className='h-4 w-4 shrink-0' />
            <span>No supervisors assigned yet</span>
          </div>
        )}
      </div>
    </div>
  );
};
