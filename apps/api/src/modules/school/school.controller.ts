import { AuthenticatedRequest } from '@/types/auth/AuthenticatedRequest';
import getUrlParam from '@/utils/getUrlParam';
import { createSchoolRequestSchema } from '@bac/contracts/schemas/school/createSchoolRequest';
import { createSchoolWithUserRequestSchema } from '@bac/contracts/schemas/school/createWithUser';
import { updateSchoolRequestSchema } from '@bac/contracts/schemas/school/updateSchoolRequest';
import { Response } from 'express';
import { SchoolAppService } from './school.app.service';
export class SchoolController {
  constructor(private readonly schoolAppService: SchoolAppService) {}

  createMySchool = async (req: AuthenticatedRequest, res: Response) => {
    const data = createSchoolRequestSchema.parse(req.body);
    const userId = req.user.claims.id;
    const school = await this.schoolAppService.createMySchool(data, userId);
    res.status(201).json(school);
  };

  createWithUser = async (req: AuthenticatedRequest, res: Response) => {
    const data = createSchoolWithUserRequestSchema.parse(req.body);
    const school = await this.schoolAppService.createWithUser(data);
    res.status(201).json(school);
  };

  updateMySchool = async (req: AuthenticatedRequest, res: Response) => {
    const data = updateSchoolRequestSchema.parse(req.body);
    const schoolId = getUrlParam(req, 'id', { isUuid: true });
    const claims = req.user.claims;
    const school = await this.schoolAppService.updateMySchool(data, schoolId, claims);
    res.status(200).json(school);
  };

  getByUserId = async (req: AuthenticatedRequest, res: Response) => {
    const userId = getUrlParam(req, 'id', { isUuid: true });
    const school = await this.schoolAppService.getByUserId(userId);
    res.status(200).json(school);
  };

  getMySchool = async (req: AuthenticatedRequest, res: Response) => {
    const claims = req.user.claims;
    const school = await this.schoolAppService.getMySchool_V2(claims);
    res.status(200).json(school);
  };
}
