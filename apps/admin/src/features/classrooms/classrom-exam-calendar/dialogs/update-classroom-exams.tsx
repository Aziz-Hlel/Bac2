import classroomService from '@/Api/service/classroomService';
import { examService } from '@/Api/service/examsService';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { useCurrentSchool } from '@/contexts/CurrentSchoolContext';
import {
  updateClassroomExamReqSchema,
  type UpdateClassroomExamReq,
} from '@bac/contracts/schemas/class/updateClassroomExamReq';
import type { CurrentTermExams } from '@bac/contracts/schemas/exam/CurrentTermExamsRes';
import type { ExamResponse } from '@bac/contracts/schemas/exam/examResponse';
import type { ExamSessionRes } from '@bac/contracts/schemas/examSession/response';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { BookOpen, Calendar, CheckCircle2, Clock, RotateCcw, Search, Sparkles } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

interface UpdateClassroomExamsProps {
  onClose: () => void;
  currentExams: ExamSessionRes[];
  classroomId: string;
}

export const UpdateClassroomExamsDialog: React.FC<UpdateClassroomExamsProps> = ({
  onClose,
  currentExams,
  classroomId,
}) => {
  const schoolId = useCurrentSchool();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');

  // Initial default values from current exams
  const defaultValues: UpdateClassroomExamReq = useMemo(
    () => ({
      examIds: currentExams.map((session) => session.exam.id),
    }),
    [currentExams],
  );

  const form = useForm<UpdateClassroomExamReq>({
    resolver: zodResolver(updateClassroomExamReqSchema),
    defaultValues,
  });

  // Fetch all exams for current term (majors + electives)
  const { data: termExamsRes, isLoading } = useQuery({
    queryKey: ['exams', 'term', 'current'],
    queryFn: () => examService.getCurrentTermExams(),
  });

  const termExamsData: CurrentTermExams[] = useMemo(() => {
    return termExamsRes?.data ?? [];
  }, [termExamsRes]);

  // Separate regular majors from Electives
  const { majorGroups, electiveGroup } = useMemo(() => {
    const majors: CurrentTermExams[] = [];
    let electives: CurrentTermExams | null = null;

    for (const group of termExamsData) {
      if (group.name === 'Electives') {
        electives = group;
      } else {
        majors.push(group);
      }
    }

    return { majorGroups: majors, electiveGroup: electives };
  }, [termExamsData]);

  // All available exam IDs
  const allExamIds = useMemo(() => {
    const ids: string[] = [];
    for (const group of termExamsData) {
      for (const exam of group.exams) {
        ids.push(exam.id);
      }
    }
    return ids;
  }, [termExamsData]);

  // Mutation to update classroom exams
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: UpdateClassroomExamReq) =>
      classroomService.updateExams({
        schoolId,
        id: classroomId,
        data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['classrooms', schoolId, classroomId, 'exams'],
      });
      toast.success('Classroom exams updated successfully');
      onClose();
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to update classroom exams');
    },
  });

  const onSubmit: SubmitHandler<UpdateClassroomExamReq> = async (data) => {
    try {
      await mutateAsync(data);
    } catch {
      // Handled in onError
    }
  };

  // Filter helper for search
  const filterExams = (exams: ExamResponse[]) => {
    if (!searchQuery.trim()) return exams;
    const query = searchQuery.trim().toLowerCase();
    return exams.filter((exam) => exam.subject.toLowerCase().includes(query));
  };

  const formatSubjectName = (subject: string) => {
    return subject.replace(/_/g, ' ');
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='flex max-h-[90vh] max-w-4xl flex-col gap-0 overflow-hidden p-0 sm:max-w-7xl'>
        <DialogHeader className='border-border/60 border-b p-6 pb-4'>
          <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            <div>
              <DialogTitle className='text-xl font-semibold tracking-tight'>Update Classroom Exams</DialogTitle>
              <DialogDescription className='text-muted-foreground mt-1 text-xs'>
                Select the exams to associate with this classroom. Choose entire majors or customize individual exams.
              </DialogDescription>
            </div>
            <div className='flex items-center gap-2'>
              <Badge variant='secondary' className='px-3 py-1 text-xs font-medium'>
                <CheckCircle2 className='text-primary mr-1.5 h-3.5 w-3.5' />
                {(form.watch('examIds') || []).length} of {allExamIds.length} Selected
              </Badge>
            </div>
          </div>

          {/* Quick Actions & Search Bar */}
          <div className='border-border/40 mt-4 flex flex-col items-stretch justify-between gap-3 border-t pt-3 sm:flex-row sm:items-center'>
            <div className='relative max-w-sm flex-1'>
              <Search className='text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4' />
              <Input
                placeholder='Search subject (e.g. Math, Physics)...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='h-9 pl-9 text-xs'
              />
            </div>

            <Button
              type='button'
              variant='ghost'
              size='sm'
              onClick={() =>
                form.setValue('examIds', [], {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              className='text-muted-foreground hover:text-foreground h-8 gap-1.5 text-xs'
              disabled={isLoading || (form.watch('examIds') || []).length === 0}
            >
              <RotateCcw className='h-3.5 w-3.5' />
              Clear All
            </Button>
          </div>
        </DialogHeader>

        {/* Form Body */}
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex h-full min-h-0 flex-1 flex-col space-y-0'>
          <div className='scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent hover:scrollbar-thumb-neutral-400 min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain p-6'>
            <FieldGroup>
              <Controller
                name='examIds'
                control={form.control}
                render={({ field, fieldState }) => {
                  const currentSelectedIds = field.value || [];
                  const selectedSet = new Set(currentSelectedIds);

                  const toggleExam = (examId: string) => {
                    const next = new Set(selectedSet);
                    if (next.has(examId)) {
                      next.delete(examId);
                    } else {
                      next.add(examId);
                    }
                    field.onChange(Array.from(next));
                  };

                  const toggleGroup = (exams: ExamResponse[]) => {
                    const groupExamIds = exams.map((e) => e.id);
                    const allSelected = groupExamIds.every((id) => selectedSet.has(id));
                    const next = new Set(selectedSet);

                    if (allSelected) {
                      groupExamIds.forEach((id) => next.delete(id));
                    } else {
                      groupExamIds.forEach((id) => next.add(id));
                    }

                    field.onChange(Array.from(next));
                  };

                  return (
                    <>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

                      {isLoading ? (
                        <div className='flex flex-col items-center justify-center space-y-3 py-16'>
                          <Spinner className='text-primary h-8 w-8' />
                          <p className='text-muted-foreground text-xs'>Loading term exams...</p>
                        </div>
                      ) : (
                        <div className='space-y-6'>
                          {/* Majors Grid */}
                          <div>
                            <div className='mb-3 flex items-center gap-2'>
                              <BookOpen className='text-primary h-4 w-4' />
                              <h3 className='text-foreground text-sm font-semibold'>Majors</h3>
                              <span className='text-muted-foreground text-xs'>({majorGroups.length} available)</span>
                            </div>

                            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                              {majorGroups.map((major) => {
                                const filteredExams = filterExams(major.exams);
                                if (filteredExams.length === 0 && searchQuery) return null;

                                const groupExamIds = major.exams.map((e) => e.id);
                                const selectedCount = groupExamIds.filter((id) => selectedSet.has(id)).length;
                                const isAllSelected = groupExamIds.length > 0 && selectedCount === groupExamIds.length;
                                const isIndeterminate = selectedCount > 0 && !isAllSelected;

                                return (
                                  <div
                                    key={major.id || major.name}
                                    className='border-border bg-card/60 hover:border-border/80 flex flex-col rounded-xl border p-4 shadow-xs transition-all duration-200'
                                  >
                                    {/* Major Header with Select All Checkbox */}
                                    <div className='border-border/50 flex items-center justify-between border-b pb-3'>
                                      <label className='flex cursor-pointer items-center gap-2.5 select-none'>
                                        <Checkbox
                                          checked={isIndeterminate ? 'indeterminate' : isAllSelected}
                                          onCheckedChange={() => toggleGroup(major.exams)}
                                        />
                                        <span className='text-foreground text-sm font-semibold capitalize'>
                                          {major.name.toLowerCase()}
                                        </span>
                                      </label>
                                      <Badge
                                        variant={selectedCount > 0 ? 'default' : 'outline'}
                                        className='h-5 px-2 text-[11px] font-medium'
                                      >
                                        {selectedCount}/{major.exams.length}
                                      </Badge>
                                    </div>

                                    {/* Individual Exam Items */}
                                    <div className='mt-3 flex-1 space-y-2'>
                                      {filteredExams.length === 0 ? (
                                        <p className='text-muted-foreground py-2 text-center text-xs'>
                                          No matching exams
                                        </p>
                                      ) : (
                                        filteredExams.map((exam) => {
                                          const isChecked = selectedSet.has(exam.id);
                                          return (
                                            <label
                                              key={exam.id}
                                              className={`flex cursor-pointer items-center justify-between rounded-lg border p-2 text-xs transition-colors select-none ${
                                                isChecked
                                                  ? 'bg-primary/5 border-primary/20 text-foreground'
                                                  : 'bg-muted/30 text-muted-foreground hover:bg-muted/60 border-transparent'
                                              }`}
                                            >
                                              <div className='flex min-w-0 items-center gap-2.5'>
                                                <Checkbox
                                                  checked={isChecked}
                                                  onCheckedChange={() => toggleExam(exam.id)}
                                                />
                                                <span className='truncate font-medium capitalize'>
                                                  {formatSubjectName(exam.subject.toLowerCase())}
                                                </span>
                                              </div>
                                              <div className='text-muted-foreground flex shrink-0 items-center gap-2 text-[11px]'>
                                                {exam.date && (
                                                  <span className='flex items-center gap-1'>
                                                    <Calendar className='h-3 w-3' />
                                                    {dayjs(exam.date).format('MMM D')}
                                                  </span>
                                                )}
                                                {exam.startTime && exam.endTime && (
                                                  <span className='flex items-center gap-1'>
                                                    <Clock className='h-3 w-3' />
                                                    {exam.startTime} - {exam.endTime}
                                                  </span>
                                                )}
                                              </div>
                                            </label>
                                          );
                                        })
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Optional / Elective Exams Section */}
                          {electiveGroup && electiveGroup.exams.length > 0 && (
                            <div className='pt-2'>
                              <div className='mb-3 flex items-center gap-2'>
                                <Sparkles className='h-4 w-4 text-purple-500' />
                                <h3 className='text-foreground text-sm font-semibold'>Elective & Optional Exams</h3>
                                <Badge
                                  variant='outline'
                                  className='border-purple-200 bg-purple-500/10 text-[11px] text-purple-600 dark:border-purple-900 dark:text-purple-400'
                                >
                                  Optional
                                </Badge>
                              </div>

                              {(() => {
                                const filteredElectives = filterExams(electiveGroup.exams);
                                const electiveIds = electiveGroup.exams.map((e) => e.id);
                                const selectedElectivesCount = electiveIds.filter((id) => selectedSet.has(id)).length;
                                const isAllElectivesSelected =
                                  electiveIds.length > 0 && selectedElectivesCount === electiveIds.length;
                                const isElectivesIndeterminate = selectedElectivesCount > 0 && !isAllElectivesSelected;

                                return (
                                  <div className='rounded-xl border border-purple-200/60 bg-purple-50/30 p-4 shadow-xs dark:border-purple-900/50 dark:bg-purple-950/20'>
                                    <div className='flex items-center justify-between border-b border-purple-100 pb-3 dark:border-purple-900/60'>
                                      <label className='flex cursor-pointer items-center gap-2.5 select-none'>
                                        <Checkbox
                                          checked={isElectivesIndeterminate ? 'indeterminate' : isAllElectivesSelected}
                                          onCheckedChange={() => toggleGroup(electiveGroup.exams)}
                                        />
                                        <span className='text-foreground text-sm font-semibold'>
                                          Select All Electives
                                        </span>
                                      </label>
                                      <Badge
                                        variant={selectedElectivesCount > 0 ? 'default' : 'outline'}
                                        className='h-5 bg-purple-600 px-2 text-[11px] font-medium text-white hover:bg-purple-600'
                                      >
                                        {selectedElectivesCount}/{electiveGroup.exams.length}
                                      </Badge>
                                    </div>

                                    <div className='mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3'>
                                      {filteredElectives.length === 0 ? (
                                        <p className='text-muted-foreground col-span-full py-2 text-center text-xs'>
                                          No matching elective exams
                                        </p>
                                      ) : (
                                        filteredElectives.map((exam) => {
                                          const isChecked = selectedSet.has(exam.id);
                                          return (
                                            <label
                                              key={exam.id}
                                              className={`flex cursor-pointer items-center justify-between rounded-lg border p-2.5 text-xs transition-colors select-none ${
                                                isChecked
                                                  ? 'text-foreground border-purple-300 bg-purple-100/60 dark:border-purple-700 dark:bg-purple-900/40'
                                                  : 'bg-background/80 border-border/50 text-muted-foreground hover:bg-background'
                                              }`}
                                            >
                                              <div className='flex min-w-0 items-center gap-2'>
                                                <Checkbox
                                                  checked={isChecked}
                                                  onCheckedChange={() => toggleExam(exam.id)}
                                                />
                                                <span className='truncate font-medium capitalize'>
                                                  {formatSubjectName(exam.subject.toLowerCase())}
                                                </span>
                                              </div>
                                              <Badge
                                                variant='outline'
                                                className='text-muted-foreground px-1.5 py-0 text-[10px]'
                                              >
                                                Elective
                                              </Badge>
                                            </label>
                                          );
                                        })
                                      )}
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  );
                }}
              />
            </FieldGroup>
          </div>

          {/* Dialog Sticky Footer */}
          <DialogFooter className='border-border/60 bg-muted/20 flex flex-row items-center justify-between gap-3 border-t p-4'>
            <div className='text-muted-foreground hidden text-xs sm:block'>
              {(form.watch('examIds') || []).length} exams selected for this classroom
            </div>
            <div className='ml-auto flex items-center gap-2'>
              <DialogClose asChild>
                <Button type='button' variant='outline' onClick={onClose} disabled={isPending} className='h-9 text-xs'>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type='submit'
                disabled={isPending}
                className='bg-primary text-primary-foreground hover:bg-primary/90 h-9 min-w-28 gap-2 text-xs'
              >
                {isPending ? <Spinner className='h-4 w-4' /> : 'Save Changes'}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateClassroomExamsDialog;
