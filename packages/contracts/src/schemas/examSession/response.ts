import type { SupervisorRole } from '@bac/db/prisma/enums';
import type { ExamResponse } from '../exam/examResponse';
import type { TeacherResponse } from '../teacher/teacherResponse';

export type ExamSessionRes = {
  sessionId: string;
  exam: ExamResponse;
  supervisors: Array<TeacherResponse & { role: SupervisorRole }>;
};
