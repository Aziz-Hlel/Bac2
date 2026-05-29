import { prisma } from '@/bootstrap/db.init';
import { CreateClassRequest } from '@bac/contracts/schemas/class/createClassRequest';
import { UpdateClassRequest } from '@bac/contracts/schemas/class/updateClassRequest';

export class ClassRepo {
  create = async (data: CreateClassRequest, schoolId: string) => {
    return await prisma.class.create({
      data: { ...data, schoolId },
    });
  };

  getBySchoolId = async (schoolId: string) => {
    return await prisma.class.findMany({
      where: { schoolId },
    });
  };

  getById = async (id: string) => {
    return await prisma.class.findUnique({
      where: { id },
    });
  };

  update = async (data: UpdateClassRequest, id: string) => {
    return await prisma.class.update({
      where: { id },
      data,
    });
  };

  delete = async (id: string) => {
    return await prisma.class.delete({
      where: { id },
    });
  };

  findMany = async (ids: string[]) => {
    return await prisma.class.findMany({
      where: { id: { in: ids } },
    });
  };
}
