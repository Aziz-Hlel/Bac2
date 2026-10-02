import React, { useEffect } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import classroomService from '@/Api/service/classroomService';
import { useCurrentSchool } from '@/contexts/CurrentSchoolContext';
import type { ClassResponse } from '@bac/contracts/schemas/class/classResponse';
import { updateClassRequestSchema, type UpdateClassRequest } from '@bac/contracts/schemas/class/updateClassRequest';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

interface EditClassroomProps {
  classroom: ClassResponse;
  onClose: () => void;
}

export const EditClassroomDialog: React.FC<EditClassroomProps> = ({ classroom, onClose }) => {
  const schoolId = useCurrentSchool();
  const queryClient = useQueryClient();

  const form = useForm<UpdateClassRequest>({
    resolver: zodResolver(updateClassRequestSchema),
    defaultValues: {
      name: classroom.name,
    },
  });

  useEffect(() => {
    form.reset({
      name: classroom.name,
    });
  }, [classroom, form]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: UpdateClassRequest) =>
      classroomService.update({
        schoolId,
        id: classroom.id,
        data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['classrooms'],
      });
      toast.success('Classroom updated successfully');
      onClose();
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to update classroom');
    },
  });

  const onSubmit: SubmitHandler<UpdateClassRequest> = async (data) => {
    try {
      await mutateAsync(data);
    } catch {
      // Handled in onError
    }
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='sm:max-w-md'>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <DialogHeader>
            <DialogTitle>Edit Classroom</DialogTitle>
            <DialogDescription>Update the name or details for this classroom.</DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Controller
              name='name'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='edit-classroom-name-input'>Classroom Name</FieldLabel>
                  <Input
                    {...field}
                    id='edit-classroom-name-input'
                    aria-invalid={fieldState.invalid}
                    placeholder='Classroom name'
                    autoFocus
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter className='flex flex-row items-center justify-end gap-2'>
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

export default EditClassroomDialog;
