import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, X, School } from 'lucide-react';

interface ClassroomHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  totalClassrooms?: number;
  onAdd?: () => void;
}

export const ClassroomHeader: React.FC<ClassroomHeaderProps> = ({
  search,
  onSearchChange,
  pageSize,
  onPageSizeChange,
  totalClassrooms,
  onAdd,
}) => {
  return (
    <div className='flex flex-col gap-5'>
      {/* Top row: Title and Add button */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <div className='flex items-center gap-2.5'>
            <div className='bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-lg'>
              <School className='h-5 w-5' />
            </div>
            <h1 className='text-foreground text-2xl font-bold tracking-tight sm:text-3xl'>Classrooms</h1>
            {totalClassrooms !== undefined && (
              <span className='bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 text-xs font-semibold'>
                {totalClassrooms}
              </span>
            )}
          </div>
          <p className='text-muted-foreground mt-1 text-sm'>
            Manage and view all your school classrooms and schedules.
          </p>
        </div>

        <Button
          size='default'
          className='flex cursor-pointer items-center gap-2 self-start shadow-sm sm:self-auto'
          onClick={onAdd}
        >
          <Plus className='h-4 w-4' />
          <span>Add Classroom</span>
        </Button>
      </div>

      {/* Filter and Controls row */}
      <div className='border-border/50 bg-card/50 flex flex-col gap-3 rounded-xl border p-3 sm:flex-row sm:items-center sm:justify-between'>
        <div className='relative flex-1 sm:max-w-md'>
          <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
          <Input
            type='text'
            placeholder='Search classrooms by name...'
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className='bg-background/70 h-9 pr-8 pl-9 text-sm'
          />
          {search && (
            <button
              type='button'
              onClick={() => onSearchChange('')}
              className='text-muted-foreground hover:text-foreground absolute top-1/2 right-2.5 -translate-y-1/2 rounded-sm p-0.5'
              aria-label='Clear search'
            >
              <X className='h-3.5 w-3.5' />
            </button>
          )}
        </div>

        <div className='flex items-center gap-2.5 self-end sm:self-auto'>
          <span className='text-muted-foreground text-xs font-medium whitespace-nowrap'>Cards per page:</span>
          <Select value={pageSize.toString()} onValueChange={(val) => onPageSizeChange(Number(val))}>
            <SelectTrigger className='bg-background/70 h-9 w-19 text-xs'>
              <SelectValue placeholder={pageSize.toString()} />
            </SelectTrigger>
            <SelectContent align='end'>
              <SelectItem value='12'>12</SelectItem>
              <SelectItem value='16'>16</SelectItem>
              <SelectItem value='24'>24</SelectItem>
              <SelectItem value='48'>48</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
