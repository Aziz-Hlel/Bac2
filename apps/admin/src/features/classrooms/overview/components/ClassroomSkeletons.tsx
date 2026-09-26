import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface ClassroomSkeletonsProps {
  count?: number;
}

export const ClassroomSkeletons: React.FC<ClassroomSkeletonsProps> = ({ count = 6 }) => {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {Array.from({ length: count }).map((_, idx) => (
        <Card key={idx} className='border-border/50 bg-card/60 border'>
          <CardContent className='flex items-center justify-between p-5'>
            <div className='flex min-w-0 flex-1 items-center gap-3.5 pr-2'>
              <Skeleton className='h-10 w-10 shrink-0 rounded-lg' />
              <div className='flex min-w-0 flex-1 flex-col gap-2'>
                <Skeleton className='h-4 w-3/4' />
                <Skeleton className='h-3 w-1/2' />
              </div>
            </div>
            <Skeleton className='h-8 w-8 rounded-md' />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
