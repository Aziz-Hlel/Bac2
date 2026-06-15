import { genUuid } from '@/seeds/helper/generateUuid';
import { SubjectEnum, TimeOfDayEnum } from '@bac/db/prisma/enums';
import { MajorSeed } from '../types';

export const mathExamsData: MajorSeed = {
  PHYLOSOPHY: {
    PRINCIPAL: {
      id: genUuid('math_philosophy_principal'),
      subject: SubjectEnum.PHYLOSOPHY,
      date: '2026-06-03',
      startTime: '08:00',
      endTime: '11:00',
      timeOfDay: TimeOfDayEnum.MORNING,
      isOptional: false,
    },
  },
  MATH: {
    PRINCIPAL: {
      id: genUuid('math_math_principal'),
      subject: SubjectEnum.MATH,
      date: '2026-06-05',
      startTime: '08:00',
      endTime: '11:00',
      timeOfDay: TimeOfDayEnum.MORNING,
      isOptional: false,
    },
  },
  FRENCH: {
    PRINCIPAL: {
      id: genUuid('math_french_principal'),
      subject: SubjectEnum.FRENCH,
      date: '2026-06-05',
      startTime: '12:00',
      endTime: '14:00',
      timeOfDay: TimeOfDayEnum.EVENING,
      isOptional: false,
    },
  },
  PHYSICS: {
    PRINCIPAL: {
      id: genUuid('math_physics_principal'),
      subject: SubjectEnum.PHYSICS,
      date: '2026-06-08',
      startTime: '08:00',
      endTime: '11:00',
      timeOfDay: TimeOfDayEnum.MORNING,
      isOptional: false,
    },
  },
  COMPUTER_SCIENCE: {
    PRINCIPAL: {
      id: genUuid('math_computer_science_principal'),
      subject: SubjectEnum.COMPUTER_SCIENCE,
      date: '2026-06-09',
      startTime: '08:00',
      endTime: '11:00',
      timeOfDay: TimeOfDayEnum.MORNING,
      isOptional: false,
    },
  },
  ARABIC: {
    PRINCIPAL: {
      id: genUuid('math_arabic_principal'),
      subject: SubjectEnum.ARABIC,
      date: '2026-06-09',
      startTime: '12:00',
      endTime: '14:00',
      timeOfDay: TimeOfDayEnum.EVENING,
      isOptional: false,
    },
  },
  ENGLISH: {
    PRINCIPAL: {
      id: genUuid('math_english_principal'),
      subject: SubjectEnum.ENGLISH,
      date: '2026-06-10',
      startTime: '08:00',
      endTime: '10:00',
      timeOfDay: TimeOfDayEnum.MORNING,
      isOptional: false,
    },
  },
};
