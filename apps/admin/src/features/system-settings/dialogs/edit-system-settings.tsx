import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertTriangle, Calendar, CalendarRange, Clock } from 'lucide-react';
import React from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import systemSettingService from '@/Api/service/systemSettingService';
import type { SystemSettingResponse } from '@bac/contracts/schemas/systemSetting/systemSettingResponse';
import {
  updateSystemSettingInputSchema,
  type UpdateSystemSettingInput,
} from '@bac/contracts/schemas/systemSetting/updateSystemSettingInput';

import SingleDatePicker from '@/components/custom/single-day-picker';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { SingleDayPicker } from '@/components/ui/single-day-picker';
import { Spinner } from '@/components/ui/spinner';
import { parseCalendarDate, toCalendarDate } from '@bac/contracts/utils/date';

interface EditSystemSettingsDialogProps {
  settings?: SystemSettingResponse | null;
  onClose: () => void;
}

export const EditSystemSettingsDialog: React.FC<EditSystemSettingsDialogProps> = ({ settings, onClose }) => {
  const queryClient = useQueryClient();

  const form = useForm<UpdateSystemSettingInput>({
    resolver: zodResolver(updateSystemSettingInputSchema),
    defaultValues: {
      principalStartDate: settings?.principalStartDate ?? undefined,
      principalEndDate: settings?.principalEndDate ?? undefined,
      retakeStartDate: settings?.retakeStartDate ?? undefined,
      retakeEndDate: settings?.retakeEndDate ?? undefined,
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: UpdateSystemSettingInput) => systemSettingService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['system-settings'],
      });
      toast.success('System settings updated successfully');
      onClose();
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to update system settings');
    },
  });

  const onSubmit: SubmitHandler<UpdateSystemSettingInput> = async (data) => {
    try {
      await mutateAsync(data);
    } catch {
      // Error handled via onError callback
    }
  };

  const rootError = form.formState.errors.root?.message || (form.formState.errors as any)['']?.message;

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-xl'>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <DialogHeader>
            <div className='text-primary flex items-center gap-2'>
              <CalendarRange className='h-5 w-5' />
              <DialogTitle className='text-lg'>Edit System Settings</DialogTitle>
            </div>
            <DialogDescription className='text-xs'>
              Configure official start and end dates for both the Principal and Retake examination sessions.
            </DialogDescription>
          </DialogHeader>

          {/* Root/Refinement Business Rule Error Banner */}
          {rootError && (
            <div className='border-destructive/30 bg-destructive/10 text-destructive animate-in fade-in flex items-start gap-2.5 rounded-lg border p-3 text-xs'>
              <AlertTriangle className='mt-0.5 h-4 w-4 shrink-0' />
              <div>
                <p className='font-semibold'>Date Sequence Constraint</p>
                <p className='mt-0.5 opacity-90'>{rootError}</p>
              </div>
            </div>
          )}

          <div className='space-y-6'>
            {/* Section 1: Principal Session */}
            <div className='bg-muted/20 space-y-3 rounded-xl border p-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div className='bg-primary/10 text-primary flex h-7 w-7 items-center justify-center rounded-lg'>
                    <Calendar className='h-4 w-4' />
                  </div>
                  <div>
                    <h4 className='text-foreground text-sm font-semibold'>Principal Session</h4>
                    <p className='text-muted-foreground text-[11px]'>Primary examination schedule</p>
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-1 gap-4 pt-1 sm:grid-cols-2'>
                <Controller
                  control={form.control}
                  name='principalStartDate'
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor='principalStartDate'>Start Date</FieldLabel>
                      <SingleDatePicker fieldProps={field} placeholder='Select start date' />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                <Controller
                  name='principalEndDate'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor='principalEndDate'>End Date</FieldLabel>
                      <SingleDayPicker
                        id='principalEndDate'
                        value={parseCalendarDate(field.value)}
                        onSelect={(date) => field.onChange(toCalendarDate(date ?? null))}
                        placeholder='Select end date'
                        className='w-full'
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>
            </div>

            {/* Section 2: Retake Session */}
            <div className='bg-muted/20 space-y-3 rounded-xl border p-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div className='flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400'>
                    <Clock className='h-4 w-4' />
                  </div>
                  <div>
                    <h4 className='text-foreground text-sm font-semibold'>Retake Session</h4>
                    <p className='text-muted-foreground text-[11px]'>Make-up examination schedule</p>
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-1 gap-4 pt-1 sm:grid-cols-2'>
                <Controller
                  name='retakeStartDate'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor='retakeStartDate'>Start Date</FieldLabel>
                      <SingleDayPicker
                        id='retakeStartDate'
                        value={parseCalendarDate(field.value)}
                        onSelect={(date) => field.onChange(toCalendarDate(date ?? null))}
                        placeholder='Select start date'
                        className='w-full'
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                <Controller
                  name='retakeEndDate'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor='retakeEndDate'>End Date</FieldLabel>
                      <SingleDayPicker
                        id='retakeEndDate'
                        value={parseCalendarDate(field.value)}
                        onSelect={(date) => field.onChange(toCalendarDate(date ?? null))}
                        placeholder='Select end date'
                        className='w-full'
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>
            </div>
          </div>

          <DialogFooter className='flex flex-row items-center justify-end gap-2 pt-2'>
            <DialogClose asChild>
              <Button type='button' variant='outline' onClick={onClose} disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type='submit' disabled={isPending} className='min-w-28 gap-2'>
              {isPending ? <Spinner className='h-4 w-4' /> : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSystemSettingsDialog;
