import React from 'react';
import { differenceInDays, format } from 'date-fns';
import { ArrowRight, CalendarRange, Clock, Check, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface SystemSettingsTimelineProps {
  principalStartDate: string | null;
  principalEndDate: string | null;
  retakeStartDate: string | null;
  retakeEndDate: string | null;
}

function parseYMD(val?: string | null): Date | undefined {
  if (!val) return undefined;
  const [y, m, d] = val.split('-').map(Number);
  if (!y || !m || !d) return undefined;
  return new Date(y, m - 1, d);
}

export const SystemSettingsTimeline: React.FC<SystemSettingsTimelineProps> = ({
  principalStartDate,
  principalEndDate,
  retakeStartDate,
  retakeEndDate,
}) => {
  const pStart = parseYMD(principalStartDate);
  const pEnd = parseYMD(principalEndDate);
  const rStart = parseYMD(retakeStartDate);
  const rEnd = parseYMD(retakeEndDate);

  const isFullyConfigured = Boolean(pStart && pEnd && rStart && rEnd);

  if (!isFullyConfigured) {
    return null;
  }

  const pDuration = pStart && pEnd ? differenceInDays(pEnd, pStart) + 1 : 0;
  const gapDuration = pEnd && rStart ? differenceInDays(rStart, pEnd) - 1 : 0;
  const rDuration = rStart && rEnd ? differenceInDays(rEnd, rStart) + 1 : 0;
  const totalSpan = pStart && rEnd ? differenceInDays(rEnd, pStart) + 1 : 0;

  return (
    <Card className='border shadow-sm'>
      <CardHeader className='pb-4'>
        <div className='flex items-center gap-2'>
          <CalendarRange className='text-primary h-5 w-5' />
          <CardTitle className='text-base font-semibold'>Examination Calendar Sequence</CardTitle>
        </div>
        <CardDescription className='text-xs'>
          Overall academic examination timeline spanning {totalSpan} calendar days from start to finish.
        </CardDescription>
      </CardHeader>

      <CardContent className='space-y-4'>
        <div className='grid grid-cols-1 items-center gap-3 md:grid-cols-3'>
          {/* Phase 1: Principal Session */}
          <div className='bg-primary/5 border-primary/20 space-y-2 rounded-xl border p-4'>
            <div className='flex items-center justify-between text-xs'>
              <span className='text-primary text-[11px] font-semibold tracking-wider uppercase'>Stage 1</span>
              <span className='text-foreground bg-primary/10 rounded-full px-2 py-0.5 font-medium'>
                {pDuration} days
              </span>
            </div>
            <h4 className='text-foreground text-sm font-semibold'>Principal Session</h4>
            <div className='text-muted-foreground flex items-center gap-1.5 text-xs'>
              <Clock className='h-3.5 w-3.5 shrink-0' />
              <span>
                {format(pStart!, 'MMM d')} – {format(pEnd!, 'MMM d, yyyy')}
              </span>
            </div>
          </div>

          {/* Transition / Interval Phase */}
          <div className='bg-muted/40 space-y-2 rounded-xl border border-dashed p-4 text-center md:text-left'>
            <div className='flex items-center justify-between text-xs'>
              <span className='text-muted-foreground text-[11px] font-semibold tracking-wider uppercase'>Interval</span>
              <span className='text-muted-foreground bg-muted rounded-full px-2 py-0.5 font-medium'>
                {gapDuration >= 0 ? `${gapDuration} days` : 'Overlap warning'}
              </span>
            </div>
            <h4 className='text-foreground text-sm font-medium'>Deliberation & Results</h4>
            <p className='text-muted-foreground text-xs'>Grading window & retake candidate announcements</p>
          </div>

          {/* Phase 2: Retake Session */}
          <div className='space-y-2 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4'>
            <div className='flex items-center justify-between text-xs'>
              <span className='text-[11px] font-semibold tracking-wider text-amber-600 uppercase dark:text-amber-400'>
                Stage 2
              </span>
              <span className='text-foreground rounded-full bg-amber-500/10 px-2 py-0.5 font-medium'>
                {rDuration} days
              </span>
            </div>
            <h4 className='text-foreground text-sm font-semibold'>Retake Session</h4>
            <div className='text-muted-foreground flex items-center gap-1.5 text-xs'>
              <Clock className='h-3.5 w-3.5 shrink-0' />
              <span>
                {format(rStart!, 'MMM d')} – {format(rEnd!, 'MMM d, yyyy')}
              </span>
            </div>
          </div>
        </div>

        {/* Validation reminder */}
        <div className='text-muted-foreground bg-accent/30 flex items-center gap-2 rounded-lg px-3 py-2 text-xs'>
          <Check className='h-4 w-4 shrink-0 text-emerald-500' />
          <span>Chronological order confirmed: Principal session completes before the retake session commences.</span>
        </div>
      </CardContent>
    </Card>
  );
};
