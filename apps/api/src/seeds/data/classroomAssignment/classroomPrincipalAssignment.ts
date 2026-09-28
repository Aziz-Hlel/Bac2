import classroomSeedData, { ClassroomSeedNames } from '../classrooms/classroomData';
import { electiveExamsData } from '../exams/exams/electiveExams';
import { majorSeedData } from '../exams/majors';

const classroomExamSessionsData = {
  A1: {
    classroomId: classroomSeedData.A1.id,
    majorId: majorSeedData.COMPUTER_SCIENCE.id,
    electiveExamId: electiveExamsData.SPANISH.PRINCIPAL.id,
  },
  A2: {
    classroomId: classroomSeedData.A2.id,
    majorId: majorSeedData.ECO.id,
    electiveExamId: electiveExamsData.SPANISH.PRINCIPAL.id,
  },
  A3: {
    classroomId: classroomSeedData.A3.id,
    majorId: majorSeedData.LETTRE.id,
    electiveExamId: electiveExamsData.MANDARIN.PRINCIPAL.id,
  },
  A4: {
    classroomId: classroomSeedData.A4.id,
    majorId: majorSeedData.MATH.id,
    electiveExamId: null,
  },
  A5: {
    classroomId: classroomSeedData.A5.id,
    majorId: majorSeedData.SPORT.id,
    electiveExamId: electiveExamsData.ITALIAN.PRINCIPAL.id,
  },
  A6: {
    classroomId: classroomSeedData.A6.id,
    majorId: majorSeedData.SCIENCE.id,
    electiveExamId: electiveExamsData.ITALIAN.PRINCIPAL.id,
  },
  A7: {
    classroomId: classroomSeedData.A7.id,
    majorId: majorSeedData.TECHNIQUE.id,
    electiveExamId: electiveExamsData.ITALIAN.PRINCIPAL.id,
  },
} as const satisfies Partial<
  Record<ClassroomSeedNames, { majorId: string; classroomId: string; electiveExamId: string | null }>
>;

export default classroomExamSessionsData;
