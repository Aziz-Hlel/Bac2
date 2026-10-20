import React from 'react';
import { format, differenceInDays } from 'date-fns';
import { Calendar, Clock, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SessionDetailCardProps {
  title: string;
  subtitle: string;
  badgeLabel: string;
  startDate: string | null;
  endDate: string | null;
  icon: React.ElementType;
  accentColor?: 'primary' | 'amber';
}

function parseYMD(val?: string | null): Date | undefined {
  if (!val) return undefined;
  const [y, m, d] = val.split('-').map(Number);
  if (!y || !m || !d) return undefined;
  return new Date(y, m - 1, d);
}

export const SessionDetailCard: React.FC<SessionDetailCardProps> = ({
  title,
  subtitle,
  badgeLabel,
  startDate,
  endDate,
  icon: Icon,
  accentColor = 'primary',
}) => {
  const start = parseYMD(startDate);
  const end = parseYMD(endDate);
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  let statusBadge: { text: string; variant: 'default' | 'secondary' | 'outline'; className?: string } = {
    text: 'Not Configured',
    variant: 'outline',
    className: 'text-muted-foreground border-dashed',
  };

  let durationDays: number | null = null;

  if (start && end) {
    durationDays = differenceInDays(end, start) + 1;

    if (now < start) {
      const daysUntil = differenceInDays(start, now);
      statusBadge = {
        text: daysUntil === 1 ? 'Starts Tomorrow' : `Upcoming in ${daysUntil} days`,
        variant: 'outline',
        className: 'border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium',
      };
    } else if (now > end) {
      statusBadge = {
        text: 'Completed',
        variant: 'secondary',
        className: 'text-muted-foreground font-medium',
      };
    } else {
      statusBadge = {
        text: 'In Progress',
        variant: 'outline',
        className:
          'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium animate-pulse',
      };
    }
  }

  const isConfigured = Boolean(start && end);

  return (
    <Card className='relative overflow-hidden border transition-all duration-200 hover:shadow-md'>
      <div
        className={cn('absolute inset-x-0 top-0 h-1.5', accentColor === 'primary' ? 'bg-primary' : 'bg-amber-500')}
      />

      <CardHeader className='flex flex-row items-start justify-between pt-6 pb-4'>
        <div className='flex items-center gap-3'>
          <div
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-xl shadow-xs',
              accentColor === 'primary'
                ? 'bg-primary/10 text-primary dark:bg-primary/20'
                : 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
            )}
          >
            <Icon className='h-5 w-5' />
          </div>
          <div>
            <div className='flex items-center gap-2'>
              <CardTitle className='text-lg font-semibold tracking-tight'>{title}</CardTitle>
              <Badge variant='secondary' className='text-[11px] font-normal'>
                {badgeLabel}
              </Badge>
            </div>
            <CardDescription className='mt-0.5 text-xs'>{subtitle}</CardDescription>
          </div>
        </div>

        <Badge variant={statusBadge.variant} className={cn('text-xs', statusBadge.className)}>
          {statusBadge.text}
        </Badge>
      </CardHeader>

      <CardContent className='space-y-4 pt-2'>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
          {/* Start Date */}
          <div className='bg-muted/30 rounded-lg border p-3.5 transition-colors'>
            <div className='text-muted-foreground flex items-center gap-1.5 text-xs font-medium'>
              <Calendar className='h-3.5 w-3.5' />
              <span>Start Date</span>
            </div>
            <div className='text-foreground mt-1.5 text-sm font-semibold'>
              {start ? (
                format(start, 'EEEE, MMMM d, yyyy')
              ) : (
                <span className='text-muted-foreground font-normal italic'>Not set</span>
              )}
            </div>
            <div className='text-muted-foreground mt-0.5 text-[11px]'>{startDate ?? '—'}</div>
          </div>

          {/* End Date */}
          <div className='bg-muted/30 rounded-lg border p-3.5 transition-colors'>
            <div className='text-muted-foreground flex items-center gap-1.5 text-xs font-medium'>
              <Calendar className='h-3.5 w-3.5' />
              <span>End Date</span>
            </div>
            <div className='text-foreground mt-1.5 text-sm font-semibold'>
              {end ? (
                format(end, 'EEEE, MMMM d, yyyy')
              ) : (
                <span className='text-muted-foreground font-normal italic'>Not set</span>
              )}
            </div>
            <div className='text-muted-foreground mt-0.5 text-[11px]'>{endDate ?? '—'}</div>
          </div>
        </div>

        {/* Footer Metrics */}
        {isConfigured && durationDays !== null ? (
          <div className='bg-accent/40 flex items-center justify-between rounded-lg px-3.5 py-2 text-xs'>
            <div className='text-muted-foreground flex items-center gap-1.5'>
              <Clock className='h-3.5 w-3.5' />
              <span>Total Session Window:</span>
            </div>
            <span className='text-foreground font-semibold'>
              {durationDays} {durationDays === 1 ? 'day' : 'calendar days'}
            </span>
          </div>
        ) : (
          <div className='bg-muted/40 text-muted-foreground flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs'>
            <Sparkles className='h-3.5 w-3.5 text-amber-500' />
            <span>Dates must be defined by a Super Admin to activate scheduling.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
