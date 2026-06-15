import { genUuid } from '@/seeds/helper/generateUuid';
import { SubjectEnum, TimeOfDayEnum } from '@bac/db/prisma/enums';
import { MajorSeed } from '../types';

export const ecoExamSeed: MajorSeed = {
  PHYLOSOPHY: {
    PRINCIPAL: {
      id: genUuid('eco_philosophy_principal'),
      subject: SubjectEnum.PHYLOSOPHY,
      date: '2026-06-03',
      startTime: '08:00',
      endTime: '11:00',
      timeOfDay: TimeOfDayEnum.MORNING,
      isOptional: false,
    },
  },
  ECONOMICS: {
    PRINCIPAL: {
      id: genUuid('eco_economics_principal'),
      subject: SubjectEnum.ECONOMICS,
      date: '2026-06-04',
      startTime: '13:00',
      endTime: '14:30',
      timeOfDay: TimeOfDayEnum.EVENING,
      isOptional: false,
    },
  },
  MATH: {
    PRINCIPAL: {
      id: genUuid('eco_math_principal'),
      subject: SubjectEnum.MATH,
      date: '2026-06-05',
      startTime: '08:00',
      endTime: '10:00',
      timeOfDay: TimeOfDayEnum.MORNING,
      isOptional: false,
    },
  },
  FRENCH: {
    PRINCIPAL: {
      id: genUuid('eco_french_principal'),
      subject: SubjectEnum.FRENCH,
      date: '2026-06-05',
      startTime: '12:00',
      endTime: '14:00',
      timeOfDay: TimeOfDayEnum.EVENING,
      isOptional: false,
    },
  },
  FINANCE: {
    PRINCIPAL: {
      id: genUuid('eco_finance_principal'),
      subject: SubjectEnum.FINANCE,
      date: '2026-06-08',
      startTime: '08:00',
      endTime: '11:00',
      timeOfDay: TimeOfDayEnum.MORNING,
      isOptional: false,
    },
  },
  HISTORY_GEOGRAPHY: {
    PRINCIPAL: {
      id: genUuid('eco_history_geography_principal'),
      subject: SubjectEnum.HISTORY_GEOGRAPHY,
      date: '2026-06-09',
      startTime: '08:00',
      endTime: '11:00',
      timeOfDay: TimeOfDayEnum.MORNING,
      isOptional: false,
    },
  },
  ARABIC: {
    PRINCIPAL: {
      id: genUuid('eco_arabic_principal'),
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
      id: genUuid('eco_english_principal'),
      subject: SubjectEnum.ENGLISH,
      date: '2026-06-10',
      startTime: '08:00',
      endTime: '10:00',
      timeOfDay: TimeOfDayEnum.MORNING,
      isOptional: false,
    },
  },
};
