import { asyncHandler } from '@/core/async-handler';
import { requireAuth } from '@/middleware/requireAuth.middleware';
import { Router } from 'express';
import { TeacherController } from './teacher.controller';

export const createRouter = (teacherController: TeacherController) => {
  const router = Router({ mergeParams: true });
  router.post('/', requireAuth, asyncHandler(teacherController.create));

  router.get('/', requireAuth, asyncHandler(teacherController.findAll));

  router.get('/:teacherId', requireAuth, asyncHandler(teacherController.getById));

  router.put('/:teacherId', requireAuth, asyncHandler(teacherController.update));

  router.delete('/:teacherId', requireAuth, asyncHandler(teacherController.delete));
  return router;
};
