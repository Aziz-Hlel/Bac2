import { ClassResponse } from '@bac/contracts/schemas/class/classResponse';
import { Class } from '@bac/db/prisma/client';

export class ClassMapper {
  static toResponse(cls: Class): ClassResponse {
    return {
      id: cls.id,
      name: cls.name,
      createdAt: cls.createdAt.toISOString(),
      updatedAt: cls.updatedAt.toISOString(),
    };
  }
}
