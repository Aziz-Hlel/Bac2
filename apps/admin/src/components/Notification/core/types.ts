import {
  notificationColumnFiltersKeys,
  notificationDefaultQuery,
  notificationQueryParamsSchema,
  notificationSortableColumnKeys,
  type NotificationTableRowType,
  type RequiredNotificationTableQueryParams,
} from '@bac/contracts/schemas/notification/notificationPageQuery';

export type TableRowType = NotificationTableRowType;

export type TableRowKeys = NotificationTableRowType;

export const columnFiltersKeys = notificationColumnFiltersKeys;

export const sortableColumnKeys = notificationSortableColumnKeys;

export const queryParamsSchema = notificationQueryParamsSchema;

export type RequiredTableQueryParams = RequiredNotificationTableQueryParams;

export const defaultQuery = notificationDefaultQuery;
