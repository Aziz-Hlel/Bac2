import getUrlParam from '@/utils/getUrlParam';
import { createExamRequestSchema } from '@bac/contracts/schemas/exam/creatExamRequest';
import { Request, Response } from 'express';
import { ExamAppService } from './exam.app.service';

export class ExamController {
  constructor(private readonly examAppService: ExamAppService) {}
  create = async (req: Request, res: Response) => {
    const payload = createExamRequestSchema.parse(req.body);
    const exam = await this.examAppService.create(payload);
    res.json(exam);
  };

  findById = async (req: Request, res: Response) => {
    const id = getUrlParam(req, 'id', { isUuid: true });
    const exam = await this.examAppService.findById({ id });
    res.json(exam);
  };

  findByMajorId = async (req: Request, res: Response) => {
    const majorId = getUrlParam(req, 'majorId', { isUuid: true });
    const exams = await this.examAppService.findByMajorId({ majorId });
    res.json(exams);
  };

  findAllElectiveExams = async (_: Request, res: Response) => {
    const exams = await this.examAppService.findAllElectiveExams();
    res.json(exams);
  };

  findAllCurrentTermExams = async (_: Request, res: Response) => {
    const exams = await this.examAppService.findAllCurrentTermExams();
    res.json(exams);
  };
}
