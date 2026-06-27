import type { TeacherResponse } from '@bac/contracts/schemas/teacher/teacherResponse';
import type { Teacher } from '@bac/db/prisma/client';

export class TeacherMapper {
  static toResponse(teacher: Teacher): TeacherResponse {
    return {
      id: teacher.id,
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      isTeacher: teacher.isTeacher,
      subject: teacher.subject,
      publicId: teacher.publicId,
      schoolId: teacher.schoolId,
      createdAt: teacher.createdAt.toISOString(),
      updatedAt: teacher.updatedAt.toISOString(),
    };
  }
}
