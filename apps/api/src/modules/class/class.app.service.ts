import { CreateClassRequest } from '@bac/contracts/schemas/class/createClassRequest';
import { ClassService } from './class.service';

export class ClassAppService {
  constructor(private readonly classService: ClassService) {}

  create = async (data: CreateClassRequest, schoolId: string) => {
    return await this.classService.create(data, schoolId);
  };
}
