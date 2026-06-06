import { classQueryParams, type ClassQueryParamsTypes } from '@bac/contracts/schemas/class/queryParams';

export type TableRowType = ClassQueryParamsTypes['TableRowType'];

export type TableRowKeys = ClassQueryParamsTypes['TableRowKeys'];

export const columnFiltersKeys = classQueryParams.filterableFields;

export const sortableColumnKeys = classQueryParams.sortableFields;

export const queryParamsSchema = classQueryParams.schema;

export const defaultQuery = classQueryParams.defaultQuery;

export type RequiredTableQueryParams = ClassQueryParamsTypes['Query'];
