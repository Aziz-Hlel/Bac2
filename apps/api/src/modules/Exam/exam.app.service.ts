import { prisma } from '@/bootstrap/db.init';
import { ConflictError, NotFoundError } from '@/err/customErrors';
import { getCurrentTerm } from '@/utils/getCurrentTerm';
import { CreateExamRequest } from '@bac/contracts/schemas/exam/creatExamRequest';
import { CurrentTermExams } from '@bac/contracts/schemas/exam/CurrentTermExamsRes';
import { ExamMapper } from './exam.mapper';
import { ExamService } from './exam.service';

export class ExamAppService {
  constructor(private readonly examService: ExamService) {}
  createElective = async (payload: Extract<CreateExamRequest, { isOptional: true }>) => {
    const exam = await this.examService.findElectiveExam({ subject: payload.subject });
    if (exam)
      throw new ConflictError({
        message: 'Exam already exists',
        internalLog: 'Elective Exam name already exists ',
        clientMessage: 'Elective Exam name already exists ',
      });

    const createdExam = await this.examService.create(payload);
    const examResponse = ExamMapper.toResponse(createdExam);
    return examResponse;
  };

  createPrincipal = async (payload: Extract<CreateExamRequest, { isOptional: false }>) => {
    const exam = await this.examService.findBySubjectAndTermAndMajor({
      subject: payload.subject,
      term: payload.term,
      majorId: payload.majorId,
    });
    if (exam)
      throw new ConflictError({
        message: 'Exam already exists',
        internalLog: 'Principal Exam name already exists ',
        clientMessage: 'Principal Exam name already exists ',
      });

    const createdExam = await this.examService.create(payload);
    const examResponse = ExamMapper.toResponse(createdExam);
    return examResponse;
  };

  create = async (payload: CreateExamRequest) => {
    if (payload.isOptional) {
      return this.createElective(payload);
    }
    return this.createPrincipal(payload);
  };

  findById = async ({ id }: { id: string }) => {
    const exam = await this.examService.findById({ id });
    if (!exam) throw new NotFoundError('Exam not found');
    const examResponse = ExamMapper.toResponseWithMajor(exam);
    return examResponse;
  };

  findByMajorId = async ({ majorId }: { majorId: string }) => {
    const exams = await this.examService.findByMajorId({ majorId });
    const examResponses = exams.map(ExamMapper.toResponseWithMajor);
    return examResponses;
  };

  findAllElectiveExams = async () => {
    const exams = await this.examService.findAllElectiveExams();
    const examResponses = exams.map(ExamMapper.toResponse);
    return examResponses;
  };

  findAllCurrentTermExams = async () => {
    const majorQuery = prisma.major.findMany({
      select: {
        id: true,
        name: true,
        exams: {
          where: {
            term: getCurrentTerm(),
          },
          orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
        },
      },
    });

    const electiveExamsQuery = prisma.exam.findMany({
      where: { isOptional: true },
    });

    const [majors, electiveExams] = await Promise.all([majorQuery, electiveExamsQuery]);

    const data: CurrentTermExams[] = majors.map((major) => {
      return {
        id: major.id,
        name: major.name,
        exams: major.exams.map(ExamMapper.toResponse),
      };
    });

    data.push({
      id: '',
      name: 'Electives',
      exams: electiveExams.map(ExamMapper.toResponse),
    });

    return data;
  };
}
