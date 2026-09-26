import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface ClassroomPaginationProps {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export const ClassroomPagination: React.FC<ClassroomPaginationProps> = ({
  currentPage,
  totalPages,
  totalElements,
  pageSize,
  onPageChange,
}) => {
  if (totalElements === 0 || totalPages <= 1) {
    if (totalElements > 0) {
      return (
        <div className='border-border/50 text-muted-foreground flex items-center justify-between border-t pt-4 text-xs'>
          <span>
            Showing <span className='text-foreground font-medium'>{totalElements}</span>{' '}
            {totalElements === 1 ? 'classroom' : 'classrooms'}
          </span>
        </div>
      );
    }
    return null;
  }

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalElements);

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className='border-border/50 flex flex-col items-center justify-between gap-4 border-t pt-4 sm:flex-row'>
      <div className='text-muted-foreground text-xs'>
        Showing <span className='text-foreground font-medium'>{startItem}</span> to{' '}
        <span className='text-foreground font-medium'>{endItem}</span> of{' '}
        <span className='text-foreground font-medium'>{totalElements}</span> classrooms
      </div>

      <div className='flex items-center gap-1.5'>
        {/* First page */}
        <Button
          variant='outline'
          size='icon'
          className='h-8 w-8 text-xs'
          onClick={() => onPageChange(1)}
          disabled={currentPage <= 1}
          aria-label='First page'
        >
          <ChevronsLeft className='h-4 w-4' />
        </Button>

        {/* Previous page */}
        <Button
          variant='outline'
          size='icon'
          className='h-8 w-8 text-xs'
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label='Previous page'
        >
          <ChevronLeft className='h-4 w-4' />
        </Button>

        {/* Page numbers */}
        <div className='flex items-center gap-1 px-1'>
          {getPageNumbers().map((pageItem, index) => {
            if (pageItem === '...') {
              return (
                <span key={`ellipsis-${index}`} className='text-muted-foreground px-1.5 text-xs'>
                  ...
                </span>
              );
            }

            const pageNum = Number(pageItem);
            const isActive = pageNum === currentPage;

            return (
              <Button
                key={pageNum}
                variant={isActive ? 'default' : 'outline'}
                size='icon'
                className={`h-8 w-8 text-xs font-medium ${isActive ? 'pointer-events-none' : ''}`}
                onClick={() => onPageChange(pageNum)}
              >
                {pageNum}
              </Button>
            );
          })}
        </div>

        {/* Next page */}
        <Button
          variant='outline'
          size='icon'
          className='h-8 w-8 text-xs'
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label='Next page'
        >
          <ChevronRight className='h-4 w-4' />
        </Button>

        {/* Last page */}
        <Button
          variant='outline'
          size='icon'
          className='h-8 w-8 text-xs'
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage >= totalPages}
          aria-label='Last page'
        >
          <ChevronsRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
};
