import { teacherQueryParams, type TeacherQueryParamsTypes } from '@bac/contracts/schemas/teacher/queryParams';

export type TableRowType = TeacherQueryParamsTypes['TableRowType'];

export type TableRowKeys = TeacherQueryParamsTypes['TableRowKeys'];

export const columnFiltersKeys = teacherQueryParams.filterableFields;

export const sortableColumnKeys = teacherQueryParams.sortableFields;

export const queryParamsSchema = teacherQueryParams.schema;

export const defaultQuery = teacherQueryParams.defaultQuery;

export type RequiredTableQueryParams = TeacherQueryParamsTypes['Query'];
