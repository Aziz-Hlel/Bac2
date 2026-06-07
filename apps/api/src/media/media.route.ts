import { asyncHandler } from '@/core/async-handler';

import { Router } from 'express';

import { requireAuth } from '@/middleware/requireAuth.middleware';
import requireRole from '@/middleware/requireRole.middleware';
import { Role } from '@bac/db/prisma/enums';
import { Request, Response } from 'express';
import { MediaController } from './media.controller';

export const createRouter = (controller: MediaController) => {
  const router = Router();

  router.post(
    '/presigned-url',
    requireAuth,
    requireRole(Role.ADMIN),
    asyncHandler((req: Request, res: Response) => controller.getPresignedUrl(req, res)),
  );

  return router;
};
