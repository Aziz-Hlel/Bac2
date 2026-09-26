import React from 'react';
import { useNavigate } from 'react-router';
import type { ClassResponse } from '@bac/contracts/schemas/class/classResponse';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useClassroomStore } from '@/store/useClassroomStore';
import { MoreVertical, Pencil, Trash2, Calendar, DoorOpen, Building, DoorClosed } from 'lucide-react';

interface ClassroomCardProps {
  classroom: ClassResponse;
}

export const ClassroomCard: React.FC<ClassroomCardProps> = ({ classroom }) => {
  const navigate = useNavigate();
  const setCurrentClassroom = useClassroomStore((state) => state.setCurrentClassroom);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(classroom.createdAt));

  const handleCardClick = () => {
    setCurrentClassroom(classroom);
    navigate(`/classrooms/${classroom.id}/calendar/month/`);
  };

  return (
    <Card
      onClick={handleCardClick}
      className='group border-border/60 bg-card/80 hover:border-primary/50 hover:bg-card hover:shadow-primary/5 relative cursor-pointer overflow-hidden border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg'
    >
      <CardContent className='flex items-center justify-between p-5'>
        <div className='flex min-w-0 flex-1 items-center gap-3.5 pr-2'>
          <div className='bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-200'>
            <DoorOpen className='hidden h-5 w-5 group-hover:block' />
            <DoorClosed className='block h-5 w-5 group-hover:hidden' />
          </div>

          <div className='min-w-0 flex-1'>
            <h3 className='text-foreground decoration-primary/70 truncate text-base font-semibold underline-offset-4 group-hover:underline'>
              {classroom.name}
            </h3>
            <div className='text-muted-foreground flex items-center gap-1.5 pt-1 text-xs'>
              <Calendar className='h-3.5 w-3.5 shrink-0 opacity-70' />
              <span className='truncate'>Created {formattedDate}</span>
            </div>
          </div>
        </div>

        <div onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='text-muted-foreground hover:bg-muted hover:text-foreground h-8 w-8 transition-colors'
                aria-label='Classroom actions'
              >
                <MoreVertical className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-36'>
              <DropdownMenuItem
                className='cursor-pointer text-sm font-medium'
                onClick={(e) => {
                  e.stopPropagation();
                  // Display only - no logic
                }}
              >
                <Pencil className='mr-2 h-4 w-4' />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className='text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer text-sm font-medium'
                onClick={(e) => {
                  e.stopPropagation();
                  // Display only - no logic
                }}
              >
                <Trash2 className='mr-2 h-4 w-4' />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};
