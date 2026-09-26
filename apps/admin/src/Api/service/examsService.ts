import type { ApiRes } from '@bac/contracts/api/apiRes';
import type { CurrentTermExams } from '@bac/contracts/schemas/exam/CurrentTermExamsRes';
import { apiService } from '../apiService';
import apiRoutes from '../routes/routes';

export const examService = {
  getCurrentTermExams: async () =>
    apiService.getThrowable<ApiRes<CurrentTermExams[]>>(apiRoutes.exams.getCurrentTermExams()),
};
