import { useQuery } from '@tanstack/react-query';
import { AlertCircle, BookOpen, CalendarClock, RefreshCw } from 'lucide-react';
import React, { useState } from 'react';

import systemSettingService from '@/Api/service/systemSettingService';
import { Button } from '@/components/ui/button';
import BreadcrumbHeader from '@/pages/Header';

import { SessionDetailCard } from './components/SessionDetailCard';
import { SystemSettingsEmptyState } from './components/SystemSettingsEmptyState';
import { SystemSettingsHeader } from './components/SystemSettingsHeader';
import { SystemSettingsSkeletons } from './components/SystemSettingsSkeletons';
import { SystemSettingsTimeline } from './components/SystemSettingsTimeline';
import { EditSystemSettingsDialog } from './dialogs/edit-system-settings';

const SystemSettingsFeature: React.FC = () => {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  const {
    data: settings,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['system-settings'],
    queryFn: () => systemSettingService.find(),
  });

  const isConfigured = Boolean(
    settings?.principalStartDate && settings?.principalEndDate && settings?.retakeStartDate && settings?.retakeEndDate,
  );

  return (
    <div className='bg-background flex min-h-screen flex-col'>
      <BreadcrumbHeader breadcrumbs={[{ title: 'System Settings', href: '/system-settings' }]} />

      <main className='mx-auto w-full max-w-6xl flex-1 space-y-6 p-4 md:p-6 lg:p-8'>
        {/* Header Section */}
        <SystemSettingsHeader isConfigured={isConfigured} onEdit={() => setIsEditOpen(true)} />

        {/* Loading State */}
        {isLoading ? (
          <SystemSettingsSkeletons />
        ) : isError ? (
          /* Error State */
          <div className='border-destructive/30 bg-destructive/5 text-destructive space-y-3 rounded-xl border p-6 text-center'>
            <div className='bg-destructive/10 mx-auto flex h-10 w-10 items-center justify-center rounded-full'>
              <AlertCircle className='h-5 w-5' />
            </div>
            <div>
              <p className='text-sm font-semibold'>Failed to load system settings</p>
              <p className='mx-auto mt-1 max-w-md text-xs opacity-80'>
                {(error as Error)?.message || 'An unexpected error occurred while fetching the system configuration.'}
              </p>
            </div>
            <Button variant='outline' size='sm' onClick={() => refetch()} className='mt-2 gap-2'>
              <RefreshCw className='h-3.5 w-3.5' />
              <span>Retry</span>
            </Button>
          </div>
        ) : !isConfigured && !settings?.principalStartDate && !settings?.principalEndDate ? (
          /* Empty / Unconfigured State */
          <div className='space-y-6'>
            <SystemSettingsEmptyState onConfigure={() => setIsEditOpen(true)} />
          </div>
        ) : (
          /* Configured / Active Display */
          <div className='animate-in fade-in-50 space-y-6 duration-300'>
            {/* Session Cards Grid */}
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <SessionDetailCard
                title='Principal Session'
                subtitle='Primary national baccalaureate exam'
                badgeLabel='Stage 1'
                startDate={settings?.principalStartDate ?? null}
                endDate={settings?.principalEndDate ?? null}
                icon={BookOpen}
                accentColor='primary'
              />

              <SessionDetailCard
                title='Retake Session'
                subtitle='Contingency and make-up examination'
                badgeLabel='Stage 2'
                startDate={settings?.retakeStartDate ?? null}
                endDate={settings?.retakeEndDate ?? null}
                icon={CalendarClock}
                accentColor='amber'
              />
            </div>

            {/* Sequence & Timeline Overview */}
            <SystemSettingsTimeline
              principalStartDate={settings?.principalStartDate ?? null}
              principalEndDate={settings?.principalEndDate ?? null}
              retakeStartDate={settings?.retakeStartDate ?? null}
              retakeEndDate={settings?.retakeEndDate ?? null}
            />
          </div>
        )}
      </main>

      {/* Edit Dialog */}
      {isEditOpen && <EditSystemSettingsDialog settings={settings} onClose={() => setIsEditOpen(false)} />}
    </div>
  );
};

export default SystemSettingsFeature;
