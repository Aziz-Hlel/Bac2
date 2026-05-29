import userService from '@/Api/service/userService';
import type { Pageable } from '@bac/contracts/types/page/Pageable';
import { useQuery } from '@tanstack/react-query';
import type { TableRowType } from './tableDeclarations/typesAndFieldsDeclaration';
import useQueryParams from './use-query-params';

const blankPagination: Pageable = {
  size: 0,
  number: 0,
  totalElements: 0,
  totalPages: 0,
  offset: 0,
  pageSize: 0,
};

const useGetTableData = () => {
  const { queryParams } = useQueryParams();
  const adjustedQueryParams = {
    ...queryParams,
    page: queryParams.page,
    role: queryParams.role.join(','),
    status: queryParams.status.join(','),
  };

  const { data, isFetching } = useQuery({
    queryKey: ['users', { ...queryParams }],
    queryFn: async () => await userService.getUsers(adjustedQueryParams),
    placeholderData: (previousData) => previousData,
  });

  const tableData: TableRowType[] = data?.content ?? [];
  const pagination = data?.pagination ?? blankPagination;

  return { tableData, pagination, isLoading: isFetching };
};

export default useGetTableData;
