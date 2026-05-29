import type { CreateNotificationRequest } from '@bac/contracts/schemas/notification/createNotification';
import type { NotificationResponse } from '@bac/contracts/schemas/notification/notificationResponse';
import type { Page } from '@bac/contracts/types/page/Page';
import { apiService } from '../apiService';
import apiRoutes from '../routes/routes';

const notificationService = {
  getPage: async (searchParams: { [k: string]: string | number | Array<string> }) =>
    apiService.getThrowable<Page<NotificationResponse>>(apiRoutes.notification.getPage(), searchParams),
  create: async (payload: CreateNotificationRequest) =>
    apiService.postThrowable(apiRoutes.notification.createNotification(), payload),
};

export default notificationService;
