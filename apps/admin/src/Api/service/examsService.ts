import type { CurrentTermExams } from '@bac/contracts/schemas/exam/CurrentTermExamsRes';
import { apiService } from '../apiService';
import apiRoutes from '../routes/routes';

export const examService = {
  getCurrentTermExams: async () => apiService.getThrowable<CurrentTermExams[]>(apiRoutes.exams.getCurrentTermExams()),
};
