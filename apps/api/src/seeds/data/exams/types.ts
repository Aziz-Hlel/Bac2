import { SubjectEnum, TermEnum, TimeOfDayEnum } from '@bac/db/prisma/enums';

export type ExamSeed = {
  id: string;
  subject: SubjectEnum;
  date: string;
  startTime: string;
  endTime: string;
  timeOfDay: TimeOfDayEnum;
  isOptional: false;
};

export type ElectiveExamSeed = {
  id: string;
  subject: SubjectEnum;
  term: TermEnum;
  date: string;
  startTime: string;
  endTime: string;
  timeOfDay: TimeOfDayEnum;
  isOptional: true;
};

export type MajorSeed = Partial<Record<SubjectEnum, Partial<Record<TermEnum, ExamSeed>>>>;
