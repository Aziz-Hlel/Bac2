import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import classroomService from '@/Api/service/classroomService';
import { useCurrentSchool } from '@/contexts/CurrentSchoolContext';
import type { ClassResponse } from '@bac/contracts/schemas/class/classResponse';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

interface DeleteClassroomProps {
  classroom: ClassResponse;
  onClose: () => void;
}

export const DeleteClassroomDialog: React.FC<DeleteClassroomProps> = ({ classroom, onClose }) => {
  const schoolId = useCurrentSchool();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () =>
      classroomService.delete({
        schoolId,
        id: classroom.id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['classrooms'],
      });
      toast.success('Classroom deleted successfully');
      onClose();
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to delete classroom');
    },
  });

  const handleDelete = async () => {
    try {
      await mutateAsync();
    } catch {
      // Handled in onError
    }
  };

  return (
    <AlertDialog open={true} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className='sm:max-w-md'>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Classroom</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <span className='text-foreground font-semibold'>{classroom.name}</span>?
            This action cannot be undone and will permanently remove associated schedules and records.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex flex-row items-center justify-end gap-2'>
          <AlertDialogCancel onClick={onClose} disabled={isPending}>
            Cancel
          </AlertDialogCancel>
          <Button
            type='button'
            variant='destructive'
            onClick={handleDelete}
            disabled={isPending}
            className='min-w-24 gap-2'
          >
            {isPending ? <Spinner className='h-4 w-4' /> : 'Delete'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteClassroomDialog;
