import { ExamService } from '@/modules/Exam/exam.service';
import { CreateExamRequest } from '@bac/contracts/schemas/exam/creatExamRequest';

export class ExamSeedService {
  constructor(private readonly examService: ExamService) {}

  run = async ({ data }: { data: CreateExamRequest }) => {
    const exam = await this.examService.findOrCreate(data);
    return exam;
  };
}
