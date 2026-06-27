import { prisma } from '@/bootstrap/db.init';
import { TermEnum } from '@bac/db/prisma/enums';

export class ClassroomPrincipalAssignmentSeedService {
  run = async (params: { classroomId: string; majorId: string }) => {
    const examsIds = await prisma.exam.findMany({
      where: {
        majorId: params.majorId,
        term: TermEnum.PRINCIPAL,
      },
      select: {
        id: true,
      },
    });

    await prisma.examSession.createMany({
      data: examsIds.map((exam) => ({
        classId: params.classroomId,
        examId: exam.id,
      })),
      skipDuplicates: true,
    });
  };
}
