import { prisma } from '@/bootstrap/db.init';
import { ExamSessionMapper } from './examSession.mapper';
import { ExamSessionRepo } from './examSession.repo';
import { includeExamAndTeacher } from './includes/includeExamAndTeacher';

export class ExamSessionService {
  constructor(private readonly examSessionRepo: ExamSessionRepo) {}

  unassignByExamIds = async (params: { schoolId: string; examIds: string[] }) => {
    const { schoolId, examIds } = params;

    return await this.examSessionRepo.deleteManyByExamIds({ schoolId, examIds });
  };

  findByClassroomId = async (classroomId: string) => {
    const queryResponse = await prisma.examSession.findMany({
      where: {
        classId: classroomId,
      },
      include: includeExamAndTeacher,
      orderBy: [
        {
          exam: { date: 'asc' },
        },
        {
          exam: { startTime: 'asc' },
        },
      ],
    });
    const result = queryResponse.map(ExamSessionMapper.toResponse);
    return result;
  };
}
