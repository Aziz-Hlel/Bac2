import { requireAuth } from '@/middleware/requireAuth.middleware';
import requireRole from '@/middleware/requireRole.middleware';
import { Role } from '@bac/db/prisma/enums';
import { Router } from 'express';
import { ExamController } from './exam.controller';

export const createExamRouter = (examController: ExamController) => {
  const examRouter = Router();
  examRouter.post('/', requireAuth, requireRole(Role.SUPER_ADMIN), examController.create);
  examRouter.get('/major/:majorId', examController.findByMajorId);
  examRouter.get('/elective', examController.findAllElectiveExams);
  examRouter.get('/term/current', examController.findAllCurrentTermExams);
  examRouter.get('/:id', examController.findById);
  return examRouter;
};
