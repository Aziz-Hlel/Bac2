import { requireAuth } from '@/middleware/requireAuth.middleware';
import requireRole from '@/middleware/requireRole.middleware';
import { Role } from '@bac/db/prisma/enums';
import { Router } from 'express';
import { asyncHandler } from '../../../core/async-handler';
import { UserController } from '../Controller/user.controller';

const createUserRouter = (controller: UserController) => {
  const router = Router();

  router.post('/', requireAuth, requireRole(Role.ADMIN), asyncHandler(controller.createUserProfile));
  router.get('/', requireAuth, requireRole(Role.ADMIN), asyncHandler(controller.getUserPage));
  router.delete('/:id', requireAuth, requireRole(Role.ADMIN), asyncHandler(controller.deleteUserProfile));
  router.post('/:id/enable', requireAuth, requireRole(Role.ADMIN), asyncHandler(controller.enableUser));
  router.post('/:id/disable', requireAuth, requireRole(Role.ADMIN), asyncHandler(controller.disableUser));
  router.put('/:id', requireAuth, requireRole(Role.ADMIN), asyncHandler(controller.updateUserProfile));

  return router;
};

export default createUserRouter;
