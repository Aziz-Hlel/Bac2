import z from 'zod';
import type { ClassResponse } from './classResponse';

type TableRowType = ClassResponse;
type TableRowKeys = keyof TableRowType;

const sortableFields = ['name', 'createdAt'] as const satisfies TableRowKeys[];
const filterableFields = [] as const satisfies TableRowKeys[];

const schema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  size: z.coerce.number().int().min(5).max(50).catch(10),
  order: z.enum(['asc', 'desc']).catch('asc'),
  search: z.string().trim().nonempty().optional().catch(undefined),
  sortBy: z.enum(sortableFields).catch('name'),
});

type QueryType = z.infer<typeof schema>;

const defaultQuery = {
  page: 1,
  size: 10,
  sortBy: 'name',
  order: 'asc',
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
