import { ExamSessionInclude } from '@bac/db/prisma/models';

export const includeExamAndTeacher = {
  exam: true,
  teacherExamSession2: {
    include: {
      supervisor: true,
    },
  },
} as const satisfies ExamSessionInclude;
