import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const SystemSettingsSkeletons: React.FC = () => {
  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {[1, 2].map((i) => (
          <Card key={i} className='border'>
            <CardHeader className='flex flex-row items-start justify-between pt-6 pb-4'>
              <div className='flex items-center gap-3'>
                <Skeleton className='h-11 w-11 rounded-xl' />
                <div className='space-y-2'>
                  <Skeleton className='h-5 w-32' />
                  <Skeleton className='h-3 w-48' />
                </div>
              </div>
              <Skeleton className='h-6 w-24 rounded-full' />
            </CardHeader>
            <CardContent className='space-y-4 pt-2'>
              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                <Skeleton className='h-20 rounded-lg' />
                <Skeleton className='h-20 rounded-lg' />
              </div>
              <Skeleton className='h-9 w-full rounded-lg' />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className='border'>
        <CardHeader className='space-y-2 pb-4'>
          <Skeleton className='h-5 w-48' />
          <Skeleton className='h-3 w-72' />
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-3'>
            <Skeleton className='h-24 rounded-xl' />
            <Skeleton className='h-24 rounded-xl' />
            <Skeleton className='h-24 rounded-xl' />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
