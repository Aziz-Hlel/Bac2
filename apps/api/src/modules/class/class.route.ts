import { asyncHandler } from '@/core/async-handler';
import { ClassController } from './class.controller';
import { Router } from 'express';
import { requireAuth } from '@/middleware/requireAuth.middleware';

export const createRouter = (classController: ClassController) => {
  const router = Router({ mergeParams: true });
  router.post('/', requireAuth, asyncHandler(classController.create));

  router.get('/', requireAuth, asyncHandler(classController.findAll));
  router.get('/:id', requireAuth, asyncHandler(classController.getById));

  router.put('/:id', requireAuth, asyncHandler(classController.update));

  router.delete('/:id', requireAuth, asyncHandler(classController.delete));

  router.get('/:classroomId/exams', requireAuth, asyncHandler(classController.findExams));

  router.put('/:classroomId/exams', requireAuth, asyncHandler(classController.updateManyByExamIds));

  return router;
};
