import { ElectiveExamEnum_V2 } from '@bac/contracts/types/enums/selectiveExams';
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

export type MajorSeed = Partial<Record<SubjectEnum, Partial<Record<TermEnum, ExamSeed>>>>;

export type ElectiveExamSeed = {
  id: string;
  subject: ElectiveExamEnum_V2;
  term: TermEnum;
  date: string;
  startTime: string;
  endTime: string;
  timeOfDay: TimeOfDayEnum;
  isOptional: true;
};

export type AllElectiveExamsSeed = Partial<Record<ElectiveExamEnum_V2, Partial<Record<TermEnum, ElectiveExamSeed>>>>;
