import classroomSeedData, { ClassroomSeedNames } from '../classrooms/classroomData';
import { majorSeedData } from '../exams/majors';

const classroomPrincipalAssignmentData = {
  A1: {
    classroomId: classroomSeedData.A1.id,
    majorId: majorSeedData.COMPUTER_SCIENCE.id,
  },
  A2: {
    classroomId: classroomSeedData.A2.id,
    majorId: majorSeedData.ECO.id,
  },
  A3: {
    classroomId: classroomSeedData.A3.id,
    majorId: majorSeedData.LETTRE.id,
  },
  A4: {
    classroomId: classroomSeedData.A4.id,
    majorId: majorSeedData.MATH.id,
  },
  A5: {
    classroomId: classroomSeedData.A5.id,
    majorId: majorSeedData.SPORT.id,
  },
  A6: {
    classroomId: classroomSeedData.A6.id,
    majorId: majorSeedData.SCIENCE.id,
  },
  A7: {
    classroomId: classroomSeedData.A7.id,
    majorId: majorSeedData.TECHNIQUE.id,
  },
} as const satisfies Partial<Record<ClassroomSeedNames, { majorId: string; classroomId: string }>>;

export default classroomPrincipalAssignmentData;
