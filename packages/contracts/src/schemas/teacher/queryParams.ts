import z from 'zod';
import { baseQueryParamsSchema } from '../helper/queryParams';
import type { TeacherResponse } from './teacherResponse';

type TableRowType = TeacherResponse;
type TableRowKeys = keyof TableRowType;

const sortableFields = ['firstName', 'lastName', 'subject', 'createdAt'] as const satisfies TableRowKeys[];
const filterableFields = [] as const satisfies TableRowKeys[];

const schema = z.object({
  ...baseQueryParamsSchema.shape,
  sortBy: z.enum(sortableFields).catch('createdAt'),
});

type QueryType = z.infer<typeof schema>;

const defaultQuery = {
  page: 1,
  size: 10,
  sortBy: 'createdAt',
  order: 'desc',
  search: undefined,
} as const satisfies QueryType;

export const teacherQueryParams = {
  schema,
  defaultQuery,
  sortableFields,
  filterableFields,
};

export type TeacherQueryParamsTypes = {
  Query: QueryType;
  TableRowType: TableRowType;
  TableRowKeys: TableRowKeys;
  SortableFields: (typeof teacherQueryParams.sortableFields)[number];
  FilterableFields: (typeof teacherQueryParams.filterableFields)[number];
};
