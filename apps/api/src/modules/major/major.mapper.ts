import { MajorResponse } from '@bac/contracts/schemas/major/majorResponse';
import { Major } from '@bac/db/prisma/client';

export class MajorMapper {
  static toMajorResponse(major: Major): MajorResponse {
    return {
      id: major.id,
      name: major.name,
    };
  }
}
