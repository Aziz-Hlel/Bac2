import type { MajorEnum } from '@bac/db/prisma/enums';
import type { ExamResponse } from './examResponse';

export type CurrentTermExams = {
  id: string;
  name: MajorEnum | 'Electives';
  exams: ExamResponse[];
};
