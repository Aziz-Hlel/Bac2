import getUrlParam from '@/utils/getUrlParam';
import { createClassRequestSchema } from '@bac/contracts/schemas/class/createClassRequest';
import { classQueryParams } from '@bac/contracts/schemas/class/queryParams';
import { updateClassRequestSchema } from '@bac/contracts/schemas/class/updateClassRequest';
import { Request, Response } from 'express';
import { ClassService } from './class.service';

export class ClassController {
  constructor(private readonly classService: ClassService) {}

  create = async (req: Request, res: Response) => {
    const data = createClassRequestSchema.parse(req.body);
    const schoolId = getUrlParam(req, 'schoolId', { isUuid: true });
    const result = await this.classService.create(data, schoolId);
    res.status(201).json({
      message: 'Class created successfully',
      data: result,
    });
  };

  getAllBySchoolId = async (req: Request, res: Response) => {
    // * Removed this and replaced it with findAll(paginated and all that), it has not route
    const schoolId = getUrlParam(req, 'schoolId', { isUuid: true });
    const result = await this.classService.getBySchoolId(schoolId);
    res.status(200).json({
      message: 'Classes fetched successfully',
      data: result,
    });
  };

  findAll = async (req: Request, res: Response) => {
    const query = classQueryParams.schema.parse(req.query);
    const schoolId = getUrlParam(req, 'schoolId', { isUuid: true });
    const result = await this.classService.findAll({ query, schoolId });
    res.status(200).json({
      message: 'Classes fetched successfully',
      ...result,
    });
  };

  getById = async (req: Request, res: Response) => {
    const id = getUrlParam(req, 'id', { isUuid: true });
    const result = await this.classService.getById(id);
    res.status(200).json({
      message: 'Class fetched successfully',
      data: result,
    });
  };

  update = async (req: Request, res: Response) => {
    const data = updateClassRequestSchema.parse(req.body);
    const id = getUrlParam(req, 'id', { isUuid: true });
    const schoolId = getUrlParam(req, 'schoolId', { isUuid: true });
    const result = await this.classService.update(data, schoolId, id);
    res.status(200).json({
      message: 'Class updated successfully',
      data: result,
    });
  };

  delete = async (req: Request, res: Response) => {
    const id = getUrlParam(req, 'id', { isUuid: true });
    const result = await this.classService.delete(id);
    res.status(200).json(result);
  };
}
