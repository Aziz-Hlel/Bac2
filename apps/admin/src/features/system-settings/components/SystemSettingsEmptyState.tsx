import React from 'react';
import { CalendarX2, CalendarPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SystemSettingsEmptyStateProps {
  onConfigure: () => void;
}

export const SystemSettingsEmptyState: React.FC<SystemSettingsEmptyStateProps> = ({ onConfigure }) => {
  return (
    <div className='bg-muted/20 animate-in fade-in-50 flex flex-col items-center justify-center rounded-2xl border border-dashed p-12 text-center'>
      <div className='bg-primary/10 text-primary flex h-16 w-16 items-center justify-center rounded-2xl shadow-xs'>
        <CalendarX2 className='h-8 w-8' />
      </div>

      <h3 className='text-foreground mt-5 text-lg font-semibold'>No Session Dates Configured</h3>
      <p className='text-muted-foreground mt-2 max-w-md text-sm'>
        The official Principal and Retake examination periods have not yet been scheduled. Setting these dates will
        allow schools and teachers to coordinate exam assignments.
      </p>

      <Button onClick={onConfigure} className='mt-6 gap-2'>
        <CalendarPlus className='h-4 w-4' />
        <span>Configure Exam Dates</span>
      </Button>
    </div>
  );
};
