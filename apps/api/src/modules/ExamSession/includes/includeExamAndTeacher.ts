import { ExamSessionInclude } from '@bac/db/prisma/models';

export const includeExamAndMajorAndTeacher = {
  exam: {
    include: {
      major: true,
    },
  },
  teacherExamSession2: {
    include: {
      supervisor: true,
    },
  },
} as const satisfies ExamSessionInclude;
