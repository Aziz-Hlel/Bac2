import { requireAuth } from '@/middleware/requireAuth.middleware';
import requireRole from '@/middleware/requireRole.middleware';
import { Role } from '@bac/db/prisma/enums';
import { Router } from 'express';
import { MajorController } from './major.controller';

export const createMajorRouter = (majorController: MajorController) => {
  const router = Router();
  router.post('/', requireAuth, requireRole(Role.SUPER_ADMIN), majorController.create);
  router.get('/', majorController.findAll);
  router.get('/:name', majorController.findByName);
  return router;
};
