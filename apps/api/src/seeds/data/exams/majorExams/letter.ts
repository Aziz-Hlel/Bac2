import { genUuid } from '@/seeds/helper/generateUuid';
import { SubjectEnum, TimeOfDayEnum } from '@bac/db/prisma/enums';
import { MajorSeed } from '../types';

export const letterExamsData: MajorSeed = {
  PHYLOSOPHY: {
    PRINCIPAL: {
      id: genUuid('letter_philosophy_principal'),
      subject: SubjectEnum.PHYLOSOPHY,
      date: '2026-06-03',
      startTime: '08:00',
      endTime: '12:00',
      timeOfDay: TimeOfDayEnum.MORNING,
      isOptional: false,
    },
  },
  ARABIC: {
    PRINCIPAL: {
      id: genUuid('letter_arabic_principal'),
      subject: SubjectEnum.ARABIC,
      date: '2026-06-08',
      startTime: '08:00',
      endTime: '11:00',
      timeOfDay: TimeOfDayEnum.MORNING,
      isOptional: false,
    },
  },
  HISTORY_GEOGRAPHY: {
    PRINCIPAL: {
      id: genUuid('letter_history_geography_principal'),
      subject: SubjectEnum.HISTORY_GEOGRAPHY,
      date: '2026-06-09',
      startTime: '08:00',
      endTime: '11:00',
      timeOfDay: TimeOfDayEnum.MORNING,
      isOptional: false,
    },
  },
  FRENCH: {
    PRINCIPAL: {
      id: genUuid('letter_french_principal'),
      subject: SubjectEnum.FRENCH,
      date: '2026-06-05',
      startTime: '08:00',
      endTime: '10:00',
      timeOfDay: TimeOfDayEnum.MORNING,
      isOptional: false,
    },
  },
  ENGLISH: {
    PRINCIPAL: {
      id: genUuid('letter_english_principal'),
      subject: SubjectEnum.ENGLISH,
      date: '2026-06-10',
      startTime: '08:00',
      endTime: '10:00',
      timeOfDay: TimeOfDayEnum.MORNING,
      isOptional: false,
    },
  },
};
