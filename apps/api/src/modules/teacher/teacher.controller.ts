import { AuthenticatedRequest } from '@/types/auth/AuthenticatedRequest';
import getUrlParam from '@/utils/getUrlParam';
import { createTeacherRequestSchema } from '@bac/contracts/schemas/teacher/createTeacherRequest';
import { teacherQueryParams } from '@bac/contracts/schemas/teacher/queryParams';
import { updateTeacherRequestSchema } from '@bac/contracts/schemas/teacher/updateTeacherRequest';
import { Response } from 'express';
import { TeacherAppService } from './teacher.app.service';

export class TeacherController {
  constructor(private readonly teacherAppService: TeacherAppService) {}

  create = async (req: AuthenticatedRequest, res: Response) => {
    const data = createTeacherRequestSchema.parse(req.body);
    const schoolId = getUrlParam(req, 'schoolId', { isUuid: true });
    const claims = req.user.claims;
    const teacher = await this.teacherAppService.create(data, schoolId, claims);
    res.status(201).json(teacher);
  };

  update = async (req: AuthenticatedRequest, res: Response) => {
    const data = updateTeacherRequestSchema.parse(req.body);
    const schoolId = getUrlParam(req, 'schoolId', { isUuid: true });
    const teacherId = getUrlParam(req, 'teacherId', { isUuid: true });
    const claims = req.user.claims;
    const teacher = await this.teacherAppService.update(data, schoolId, teacherId, claims);
    res.status(200).json(teacher);
  };

  delete = async (req: AuthenticatedRequest, res: Response) => {
    const teacherId = getUrlParam(req, 'teacherId', { isUuid: true });
    const teacher = await this.teacherAppService.delete(teacherId);
    res.status(200).json(teacher);
  };

  getBySchoolId = async (req: AuthenticatedRequest, res: Response) => {
    // * you might wanna add query params to this not just give all teachers without pagination
    const schoolId = getUrlParam(req, 'schoolId', { isUuid: true });
    const claims = req.user.claims;
    const teacher = await this.teacherAppService.getBySchoolId(schoolId, claims);
    res.status(200).json(teacher);
  };

  findAll = async (req: AuthenticatedRequest, res: Response) => {
    const schoolId = getUrlParam(req, 'schoolId', { isUuid: true });
    const query = teacherQueryParams.schema.parse(req.query);
    const teacher = await this.teacherAppService.findAll({ query, schoolId });
    res.status(200).json(teacher);
  };

  getById = async (req: AuthenticatedRequest, res: Response) => {
    const teacherId = getUrlParam(req, 'teacherId', { isUuid: true });
    const schoolId = getUrlParam(req, 'schoolId', { isUuid: true });
    const claims = req.user.claims;
    const teacher = await this.teacherAppService.getById(teacherId, schoolId, claims);
    res.status(200).json(teacher);
  };
}
