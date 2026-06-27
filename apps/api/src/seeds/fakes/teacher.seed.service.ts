import { prisma } from '@/bootstrap/db.init';
import { SubjectEnum } from '@bac/db/prisma/enums';
import { faker } from '@faker-js/faker';

export type TeacherCreateSeedInputStrict = {
  id: string;
  schoolId: string;
};

export type TeacherCreateSeedInputOptional = {
  firstName: string;
  lastName: string;
  subject: SubjectEnum;
  isTeacher: boolean;
};

export type TeacherCreateSeedInput = TeacherCreateSeedInputStrict & Partial<TeacherCreateSeedInputOptional>;

export class TeacherSeedService {
  private generateFakeSeed = (params: TeacherCreateSeedInput) => ({
    ...params,
    publicId: faker.string.alphanumeric(8),
    firstName: params.firstName ?? faker.person.firstName(),
    lastName: params.lastName ?? faker.person.lastName(),
    subject: params.subject ?? faker.helpers.enumValue(SubjectEnum),
    isTeacher: true,
  });

  run = async (params: TeacherCreateSeedInput) => {
    const teacher = this.generateFakeSeed(params);
    await prisma.teacher.upsert({
      where: {
        id: params.id,
      },
      create: teacher,
      update: {},
    });
  };
}
