import { genUuid } from '@/seeds/helper/generateUuid';
import { SubjectEnum, TermEnum, TimeOfDayEnum } from '@bac/db/prisma/enums';
import { AllElectiveExamsSeed } from '../types';

export const electiveExamsData = {
  GERMAN: {
    PRINCIPAL: {
      id: genUuid('elective_german_principal'),
      subject: SubjectEnum.GERMAN,
      date: '2026-06-03',
      startTime: '13:00',
      endTime: '14:30',
      timeOfDay: TimeOfDayEnum.EVENING,
      isOptional: true,
      term: TermEnum.PRINCIPAL,
    },
  },
  ITALIAN: {
    PRINCIPAL: {
      id: genUuid('elective_italian_principal'),
      subject: SubjectEnum.ITALIAN,
      date: '2026-06-03',
      startTime: '13:00',
      endTime: '14:30',
      timeOfDay: TimeOfDayEnum.EVENING,
      isOptional: true,
      term: TermEnum.PRINCIPAL,
    },
  },
  SPANISH: {
    PRINCIPAL: {
      id: genUuid('elective_spanish_principal'),
      subject: SubjectEnum.SPANISH,
      date: '2026-06-03',
      startTime: '13:00',
      endTime: '14:30',
      timeOfDay: TimeOfDayEnum.EVENING,
      isOptional: true,
      term: TermEnum.PRINCIPAL,
    },
  },
  MANDARIN: {
    PRINCIPAL: {
      id: genUuid('elective_mandarin_principal'),
      subject: SubjectEnum.MANDARIN,
      date: '2026-06-03',
      startTime: '13:00',
      endTime: '14:30',
      timeOfDay: TimeOfDayEnum.EVENING,
      isOptional: true,
      term: TermEnum.PRINCIPAL,
    },
  },
  MUSIC: {
    PRINCIPAL: {
      id: genUuid('elective_music_principal'),
      subject: SubjectEnum.MUSIC,
      date: '2026-06-10',
      startTime: '13:00',
      endTime: '14:30',
      timeOfDay: TimeOfDayEnum.EVENING,
      isOptional: true,
      term: TermEnum.PRINCIPAL,
    },
  },
} as const satisfies AllElectiveExamsSeed;
