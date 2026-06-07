import { prisma } from '@/bootstrap/db.init';
import { ConflictError, NotFoundError } from '@/err/customErrors';
import { PageMapper } from '@/helper/page.mapper';
import { CreateClassRequest } from '@bac/contracts/schemas/class/createClassRequest';
import { ClassQueryParamsTypes } from '@bac/contracts/schemas/class/queryParams';
import { UpdateClassRequest } from '@bac/contracts/schemas/class/updateClassRequest';
import { Prisma } from '@bac/db/prisma/client';
import { ClassMapper } from './class.mapper';
import { ClassRepo } from './class.repo';

export class ClassService {
  constructor(private readonly classRepo: ClassRepo) {}

  create = async (data: CreateClassRequest, schoolId: string) => {
    const existingClass = await prisma.class.findUnique({
      where: { schoolId_name: { name: data.name, schoolId } },
      select: { id: true },
    });
    if (existingClass) throw new ConflictError('Class already exists');

    const newClass = await prisma.class.create({ data: { ...data, schoolId } });
    const classResponse = ClassMapper.toResponse(newClass);
    return classResponse;
  };

  getBySchoolId = async (schoolId: string) => {
    const classes = await this.classRepo.getBySchoolId(schoolId);
    const classResponses = classes.map((cls) => ClassMapper.toResponse(cls));
    return classResponses;
  };

  findAll = async (params: { query: ClassQueryParamsTypes['Query']; schoolId: string }) => {
    const { query, schoolId } = params;

    const skip = (query.page - 1) * query.size;
    const take = query.size;

    const where: Prisma.ClassWhereInput = { schoolId };

    if (query.search && query.search.trim().length > 0) {
      const searchValue = query.search.trim().toLowerCase();
      where.name = { contains: searchValue, mode: 'insensitive' };
    }

    const orderBy: Prisma.ClassOrderByWithRelationInput = {};

    if (query.sortBy) {
      orderBy[query.sortBy] = query.order;
    }

    const classes = prisma.class.findMany({
      skip,
      take,
      where,
      orderBy,
    });
    const classesCount = prisma.class.count({ where });

    const [data, totalElements] = await Promise.all([classes, classesCount]);

    const response = PageMapper.toPage({ data, totalElements, pagination: query });

    return response;
  };

  getById = async (id: string) => {
    const cls = await this.classRepo.getById(id);
    if (!cls) throw new NotFoundError('Class not found');
    const classResponse = ClassMapper.toResponse(cls);
    return classResponse;
  };

  update = async (data: UpdateClassRequest, schoolId: string, classId: string) => {
    const newName = data.name;
    const existingClass = await prisma.class.findUnique({
      where: { schoolId_name: { name: newName, schoolId } },
      select: { id: true },
    });
    if (existingClass) throw new ConflictError('Class already exists');

    const updatedClass = await this.classRepo.update(data, classId);
    const classResponse = ClassMapper.toResponse(updatedClass);
    return classResponse;
  };

  delete = async (id: string) => {
    return await this.classRepo.delete(id);
  };
}
