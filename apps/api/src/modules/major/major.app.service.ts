import { ConflictError } from '@/err/customErrors';
import { MajorEnum } from '@/generated/prisma/enums';
import { CreateMajorRequest } from '@bac/contracts/schemas/major/createMajorRequest';
import { MajorMapper } from './major.mapper';
import { MajorService } from './major.service';

export class MajorAppService {
  constructor(private readonly majorService: MajorService) {}

  create = async (payload: CreateMajorRequest) => {
    const { major, type } = await this.majorService.findOrCreate(payload);
    if (type === 'EXIST') throw new ConflictError('Major already exists');
    const majorResponse = MajorMapper.toMajorResponse(major);
    return majorResponse;
  };

  findAll = async () => {
    const majors = await this.majorService.findAll();
    return majors;
  };

  findByName = async (majorName: MajorEnum) => {
    const major = await this.majorService.findByNameWithExams({ name: majorName });
    if (!major) throw new Error('Major not found');
    const majorResponse = MajorMapper.toMajorResponse(major);
    return majorResponse;
  };
}
