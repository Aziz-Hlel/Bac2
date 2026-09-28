import type { SupervisorRole } from '@bac/db/prisma/enums';
import type { ExamWithMajorResponse } from '../exam/examWithMajorResponse';
import type { TeacherResponse } from '../teacher/teacherResponse';

export type ExamSessionRes = {
  sessionId: string;
  exam: ExamWithMajorResponse;
  supervisors: Array<TeacherResponse & { role: SupervisorRole }>;
};
