import React from 'react';
import { CalendarCog, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SystemSettingsHeaderProps {
  isConfigured: boolean;
  onEdit: () => void;
}

export const SystemSettingsHeader: React.FC<SystemSettingsHeaderProps> = ({ isConfigured, onEdit }) => {
  return (
    <div className='flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between'>
      <div className='space-y-1.5'>
        <div className='flex items-center gap-2.5'>
          <h1 className='text-foreground text-2xl font-bold tracking-tight sm:text-3xl'>System Settings</h1>
          {isConfigured ? (
            <Badge
              variant='outline'
              className='gap-1 border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
            >
              <CheckCircle2 className='h-3 w-3' />
              Configured
            </Badge>
          ) : (
            <Badge
              variant='outline'
              className='gap-1 border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400'
            >
              <AlertCircle className='h-3 w-3' />
              Setup Required
            </Badge>
          )}
        </div>
        <p className='text-muted-foreground text-sm'>
          Manage official national exam sessions, duration windows, and system-wide calendar parameters.
        </p>
      </div>

      <div className='flex items-center gap-3'>
        <Button onClick={onEdit} className='gap-2 shadow-sm'>
          <CalendarCog className='h-4 w-4' />
          <span>Edit Settings</span>
        </Button>
      </div>
    </div>
  );
};
