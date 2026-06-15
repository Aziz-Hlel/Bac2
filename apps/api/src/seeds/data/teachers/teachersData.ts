import { TeacherCreateSeedInput } from '@/seeds/fakes/teacher.seed.service';
import { genUuid } from '@/seeds/helper/generateUuid';
import { schoolSeedData } from '../schools/schoolData';

const teacherSeedData = {
  teacher1: {
    id: genUuid('teacher1'),
    isTeacher: true,
    schoolId: schoolSeedData.tiganaSchool.id,
  },
  teacher2: {
    id: genUuid('teacher2'),
    isTeacher: true,
    schoolId: schoolSeedData.tiganaSchool.id,
  },
  teacher3: {
    id: genUuid('teacher3'),
    isTeacher: true,
    schoolId: schoolSeedData.tiganaSchool.id,
  },
  teacher4: {
    id: genUuid('teacher4'),
    isTeacher: true,
    schoolId: schoolSeedData.tiganaSchool.id,
  },
  teacher5: {
    id: genUuid('teacher5'),
    isTeacher: true,
    schoolId: schoolSeedData.tiganaSchool.id,
  },
  teacher6: {
    id: genUuid('teacher6'),
    isTeacher: true,
    schoolId: schoolSeedData.tiganaSchool.id,
  },
  teacher7: {
    id: genUuid('teacher7'),
    isTeacher: true,
    schoolId: schoolSeedData.tiganaSchool.id,
  },
  teacher8: {
    id: genUuid('teacher8'),
    isTeacher: true,
    schoolId: schoolSeedData.tiganaSchool.id,
  },
  teacher9: {
    id: genUuid('teacher9'),
    isTeacher: true,
    schoolId: schoolSeedData.tiganaSchool.id,
  },
  teacher10: {
    id: genUuid('teacher10'),
    isTeacher: true,
    schoolId: schoolSeedData.tiganaSchool.id,
  },
  teacher11: {
    id: genUuid('teacher11'),
    isTeacher: true,
    schoolId: schoolSeedData.tiganaSchool.id,
  },
  teacher12: {
    id: genUuid('teacher12'),
    isTeacher: true,
    schoolId: schoolSeedData.tiganaSchool.id,
  },
  teacher13: {
    id: genUuid('teacher13'),
    isTeacher: true,
    schoolId: schoolSeedData.tiganaSchool.id,
  },
  teacher14: {
    id: genUuid('teacher14'),
    isTeacher: true,
    schoolId: schoolSeedData.tiganaSchool.id,
  },
  teacher15: {
    id: genUuid('teacher15'),
    isTeacher: true,
    schoolId: schoolSeedData.tiganaSchool.id,
  },
  teacher16: {
    id: genUuid('teacher16'),
    isTeacher: true,
    schoolId: schoolSeedData.tiganaSchool.id,
  },
  teacher17: {
    id: genUuid('teacher17'),
    isTeacher: true,
    schoolId: schoolSeedData.tiganaSchool.id,
  },
  teacher18: {
    id: genUuid('teacher18'),
    isTeacher: true,
    schoolId: schoolSeedData.tiganaSchool.id,
  },
  teacher19: {
    id: genUuid('teacher19'),
    isTeacher: true,
    schoolId: schoolSeedData.tiganaSchool.id,
  },
  teacher20: {
    id: genUuid('teacher20'),
    isTeacher: true,
    schoolId: schoolSeedData.tiganaSchool.id,
  },
} as const satisfies Record<string, TeacherCreateSeedInput>;

export default teacherSeedData;
