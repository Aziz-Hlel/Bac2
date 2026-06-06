import z from 'zod';
import { baseQueryParamsSchema } from '../helper/queryParams';
import type { ClassResponse } from './classResponse';

type TableRowType = ClassResponse;
type TableRowKeys = keyof TableRowType;

const sortableFields = ['name', 'createdAt'] as const satisfies TableRowKeys[];
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

export const classQueryParams = {
  schema,
  defaultQuery,
  sortableFields,
  filterableFields,
};

export type ClassQueryParamsTypes = {
  Query: QueryType;
  TableRowType: TableRowType;
  TableRowKeys: TableRowKeys;
  SortableFields: (typeof classQueryParams.sortableFields)[number];
  FilterableFields: (typeof classQueryParams.filterableFields)[number];
};
