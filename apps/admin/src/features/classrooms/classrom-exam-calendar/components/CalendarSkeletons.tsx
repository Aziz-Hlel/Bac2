import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const CalendarSkeletons: React.FC = () => {
  return (
    <div className='space-y-4'>
      {/* Header skeleton */}
      <div className='border-border/60 flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-center gap-3'>
          <Skeleton className='h-9 w-28 rounded-lg' />
          <Skeleton className='h-9 w-48 rounded-lg' />
        </div>
        <Skeleton className='h-9 w-44 rounded-lg' />
      </div>

      {/* Grid skeleton */}
      <div className='border-border bg-card overflow-hidden rounded-xl border p-4'>
        <div className='border-border grid grid-cols-7 gap-3 border-b pb-4'>
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className='h-12 w-full rounded-md' />
          ))}
        </div>
        <div className='grid grid-cols-7 gap-3 pt-4'>
          {Array.from({ length: 7 }).map((_, col) => (
            <div key={col} className='space-y-4'>
              {col % 2 === 1 && <Skeleton className='h-56 w-full rounded-xl' />}
              {col % 3 === 0 && <Skeleton className='h-64 w-full rounded-xl' />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
