import { ExamSessionRes } from '@bac/contracts/schemas/examSession/response';
import { ExamSessionGetPayload } from '@bac/db/prisma/models';
import { ExamMapper } from '../Exam/exam.mapper';
import { TeacherMapper } from '../teacher/teacher.mapper';
import { includeExamAndMajorAndTeacher } from './includes/includeExamAndTeacher';

export class ExamSessionMapper {
  static toResponse(
    examSession: ExamSessionGetPayload<{ include: typeof includeExamAndMajorAndTeacher }>,
  ): ExamSessionRes {
    return {
      sessionId: examSession.id,
      exam: ExamMapper.toResponseWithMajor(examSession.exam),
      supervisors: examSession.teacherExamSession2.map((item) => ({
        ...TeacherMapper.toResponse(item.supervisor),
        role: item.role,
      })),
    };
  }
}
