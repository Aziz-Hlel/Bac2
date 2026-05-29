import { School, User } from '@/generated/prisma/client';
import { SchoolGetPayload } from '@/generated/prisma/models';
import { SchoolResponse } from '@bac/contracts/schemas/school/schoolResponse';
import { SchoolResponseWithDetails } from '@bac/contracts/schemas/school/SchoolResponseWithDetails';
import { SchoolWithUserResponse } from '@bac/contracts/schemas/school/schoolWithUserResponse';
import { ElectiveExamEnum_V2 } from '@bac/contracts/types/enums/meta/selectiveExamsEnum';
import UserMapper from '../User/mapper/user.mapper';

export class SchoolMapper {
  static toResponse(school: School): SchoolResponse {
    return {
      id: school.id,
      name: school.name,
      publicId: school.publicId,
      city: school.city,
    };
  }

  static toWithUserResponse(school: School, user: User): SchoolWithUserResponse {
    const userResponse = UserMapper.toUserResponse(user);
    return {
      ...userResponse,
      school: this.toResponse(school),
    };
  }

  static toWithDetails(
    school: SchoolGetPayload<{
      include: { electiveExams: { include: { exam: true } }; majors: { include: { major: true } } };
    }>,
  ): SchoolResponseWithDetails {
    return {
      ...this.toResponse(school),
      majors: school.majors.map((major) => ({
        id: major.id,
        name: major.major.name,
        nbrClasses: major.nbrClasses,
      })),
      electiveExams: school.electiveExams.map((electiveExam) => ({
        id: electiveExam.id,
        name: electiveExam.exam.subject as ElectiveExamEnum_V2,
        nbrClasses: electiveExam.nbrClasses,
      })),
    };
  }
}
