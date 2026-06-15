import { prisma } from '@/bootstrap/db.init';
import { parseCalendarDate, parseTime } from '@/utils/dayjs';
import { SubjectEnum, TermEnum, TimeOfDayEnum } from '@bac/db/prisma/enums';

export type ExamCreaInputSeed = {
  id: string;
  subject: SubjectEnum;
  term: TermEnum;
  date: string;
  startTime: string;
  endTime: string;
  timeOfDay: TimeOfDayEnum;
} & (
  | {
      isOptional: true;
    }
  | {
      isOptional: false;
      majorId: string;
    }
);

export class ExamSeedService {
  run = async (params: ExamCreaInputSeed) => {
    await prisma.exam.upsert({
      where: {
        id: params.id,
      },
      create: {
        id: params.id,
        subject: params.subject,
        timeOfDay: params.timeOfDay,
        date: parseCalendarDate(params.date),
        startTime: parseTime(params.startTime),
        endTime: parseTime(params.endTime),
        term: params.term,
        isOptional: params.isOptional,
        ...(!params.isOptional && { major: { connect: { id: params.majorId } } }),
      },
      update: {},
    });
  };
}
