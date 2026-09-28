import { prisma } from '@/bootstrap/db.init';
import { TermEnum } from '@bac/db/prisma/enums';

export class ClassroomExamSessionsSeedService {
  run = async (params: { classroomId: string; majorId: string; electiveExamId: string | null }) => {
    const examsIds = await prisma.exam.findMany({
      where: {
        majorId: params.majorId,
        term: TermEnum.PRINCIPAL,
      },
      select: {
        id: true,
      },
    });

    if (params.electiveExamId) {
      examsIds.push({ id: params.electiveExamId });
    }

    await prisma.examSession.createMany({
      data: examsIds.map((exam) => ({
        classId: params.classroomId,
        examId: exam.id,
      })),
      skipDuplicates: true,
    });
  };
}
