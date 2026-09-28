import { genUuid } from '@/seeds/helper/generateUuid';
import { SubjectEnum, TimeOfDayEnum } from '@bac/db/prisma/enums';
import { MajorSeed } from '../types';

export const scienceExamsData: MajorSeed = {
  PHYLOSOPHY: {
    PRINCIPAL: {
      id: genUuid('science_philosophy_principal'),
      subject: SubjectEnum.PHYLOSOPHY,
      date: '2026-06-03',
      startTime: '08:00',
      endTime: '11:00',
      timeOfDay: TimeOfDayEnum.MORNING,
      isOptional: false,
    },
  },
  BIOLOGY: {
    PRINCIPAL: {
      id: genUuid('science_biology_principal'),
      subject: SubjectEnum.BIOLOGY,
      date: '2026-06-04',
      startTime: '08:00',
      endTime: '11:00',
      timeOfDay: TimeOfDayEnum.MORNING,
      isOptional: false,
    },
  },
  MATH: {
    PRINCIPAL: {
      id: genUuid('science_math_principal'),
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
      id: genUuid('science_french_principal'),
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
      id: genUuid('science_physics_principal'),
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
      id: genUuid('science_computer_science_principal'),
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
      id: genUuid('science_arabic_principal'),
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
      id: genUuid('science_english_principal'),
      subject: SubjectEnum.ENGLISH,
      date: '2026-06-10',
      startTime: '08:00',
      endTime: '10:00',
      timeOfDay: TimeOfDayEnum.MORNING,
      isOptional: false,
    },
  },
};
