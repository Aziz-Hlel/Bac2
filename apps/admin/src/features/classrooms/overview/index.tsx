import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import classroomService from '@/Api/service/classroomService';
import { useCurrentSchool } from '@/contexts/CurrentSchoolContext';
import type { ClassResponse } from '@bac/contracts/schemas/class/classResponse';
import BreadcrumbHeader from '@/pages/Header';
import { ClassroomCard } from './components/ClassroomCard';
import { ClassroomHeader } from './components/ClassroomHeader';
import { ClassroomPagination } from './components/ClassroomPagination';
import { ClassroomSkeletons } from './components/ClassroomSkeletons';
import { ClassroomEmptyState } from './components/ClassroomEmptyState';
import { AddClassroomDialog } from './dialogs/add-classroom';
import { EditClassroomDialog } from './dialogs/edit-classroom';
import { DeleteClassroomDialog } from './dialogs/delete-classroom';

const ClassroomOverview: React.FC = () => {
  const schoolId = useCurrentSchool();

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(16);
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');

  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [editingClassroom, setEditingClassroom] = useState<ClassResponse | null>(null);
  const [deletingClassroom, setDeletingClassroom] = useState<ClassResponse | null>(null);

  // Debounce search query changes
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1); // Reset to page 1 on new search
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  // Query classroom page
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['classrooms', schoolId, page, pageSize, debouncedSearch],
    queryFn: () =>
      classroomService.getPage({
        schoolId,
        searchParams: {
          page,
          size: pageSize,
          ...(debouncedSearch ? { search: debouncedSearch } : {}),
        },
      }),
    enabled: Boolean(schoolId),
  });

  const classrooms = data?.data ?? [];
  const pagination = data?.pagination;
  const totalElements = pagination?.totalElements ?? classrooms.length;
  const totalPages = pagination?.totalPages ?? Math.max(1, Math.ceil(totalElements / pageSize));

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearch('');
    setDebouncedSearch('');
    setPage(1);
  };

  return (
    <div className='bg-background flex min-h-screen flex-col'>
      <BreadcrumbHeader breadcrumbs={[{ title: 'Classrooms', href: '/classrooms' }]} />

      <main className='w-full flex-1 space-y-6 p-4 md:p-6 lg:p-8'>
        {/* Top Header Controls */}
        <ClassroomHeader
          search={search}
          onSearchChange={setSearch}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
          totalClassrooms={pagination?.totalElements}
          onAdd={() => setIsAddOpen(true)}
        />

        {/* Content Section */}
        {isLoading ? (
          <ClassroomSkeletons count={pageSize} />
        ) : isError ? (
          <div className='border-destructive/30 bg-destructive/5 text-destructive rounded-xl border p-6 text-center text-sm'>
            <p className='font-semibold'>Failed to load classrooms</p>
            <p className='mt-1 text-xs opacity-80'>
              {(error as Error)?.message || 'An unexpected error occurred while fetching classroom data.'}
            </p>
          </div>
        ) : classrooms.length === 0 ? (
          <ClassroomEmptyState isSearchActive={Boolean(debouncedSearch)} onClearSearch={handleClearSearch} />
        ) : (
          <div className='space-y-6'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {classrooms.map((classroom) => (
                <ClassroomCard
                  key={classroom.id}
                  classroom={classroom}
                  onEdit={(item) => setEditingClassroom(item)}
                  onDelete={(item) => setDeletingClassroom(item)}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            <ClassroomPagination
              currentPage={page}
              totalPages={totalPages}
              totalElements={totalElements}
              pageSize={pageSize}
              onPageChange={setPage}
            />
          </div>
        )}
      </main>

      {/* Dialogs */}
      {isAddOpen && <AddClassroomDialog onClose={() => setIsAddOpen(false)} />}
      {editingClassroom && (
        <EditClassroomDialog classroom={editingClassroom} onClose={() => setEditingClassroom(null)} />
      )}
      {deletingClassroom && (
        <DeleteClassroomDialog classroom={deletingClassroom} onClose={() => setDeletingClassroom(null)} />
      )}
    </div>
  );
};

export default ClassroomOverview;
