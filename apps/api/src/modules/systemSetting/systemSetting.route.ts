import { requireAuth } from '@/middleware/requireAuth.middleware';
import requireRole from '@/middleware/requireRole.middleware';
import { Role } from '@bac/db/prisma/enums';
import { Router } from 'express';
import { SystemSettingController } from './systemSetting.controller';

export const createSystemSettingRouter = (systemSettingController: SystemSettingController) => {
  const router = Router({ mergeParams: true });
  router.get('/', requireAuth, requireRole(Role.SUPER_ADMIN, Role.ADMIN), systemSettingController.find);
  router.put('/', requireAuth, requireRole(Role.SUPER_ADMIN, Role.ADMIN), systemSettingController.update);
  return router;
};
