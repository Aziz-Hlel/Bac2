import { CreateTeacherRequest } from '@bac/contracts/schemas/teacher/createTeacherRequest';
import { UpdateTeacherRequest } from '@bac/contracts/schemas/teacher/updateTeacherRequest';
import { TeacherRepo } from './teacher.repo';

export class TeacherService {
  constructor(private readonly teacherRepo: TeacherRepo) {}

  create = async (data: CreateTeacherRequest, userId: string) => {
    return await this.teacherRepo.create(data, userId);
  };

  getById = async (id: string) => {
    return await this.teacherRepo.getById(id);
  };

  getBySchoolId = async (schoolId: string) => {
    return await this.teacherRepo.getBySchoolId(schoolId);
  };

  update = async (data: UpdateTeacherRequest, id: string) => {
    return await this.teacherRepo.update(data, id);
  };

  delete = async (id: string) => {
    return await this.teacherRepo.delete(id);
  };
}
