import React from 'react';
import { Button } from '@/components/ui/button';
import { DoorClosed, SearchX, Plus } from 'lucide-react';

interface ClassroomEmptyStateProps {
  isSearchActive?: boolean;
  onClearSearch?: () => void;
}

export const ClassroomEmptyState: React.FC<ClassroomEmptyStateProps> = ({ isSearchActive = false, onClearSearch }) => {
  return (
    <div className='border-border/80 bg-card/30 flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center'>
      <div className='bg-muted/80 text-muted-foreground flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm'>
        {isSearchActive ? <SearchX className='h-7 w-7 opacity-80' /> : <DoorClosed className='h-7 w-7 opacity-80' />}
      </div>

      <h3 className='text-foreground mt-4 text-base font-semibold'>
        {isSearchActive ? 'No matching classrooms found' : 'No classrooms added yet'}
      </h3>

      <p className='text-muted-foreground mt-1 max-w-sm text-sm'>
        {isSearchActive
          ? 'No classrooms matched your search criteria. Try checking for spelling errors or clear the search.'
          : 'Get started by adding your first classroom to begin organizing exam sessions and schedules.'}
      </p>

      <div className='mt-6 flex items-center gap-3'>
        {isSearchActive ? (
          <Button variant='outline' size='sm' onClick={onClearSearch}>
            Clear search
          </Button>
        ) : (
          <Button
            size='sm'
            className='flex items-center gap-2'
            onClick={() => {
              // Display only - no logic
            }}
          >
            <Plus className='h-4 w-4' />
            <span>Add Classroom</span>
          </Button>
        )}
      </div>
    </div>
  );
};
