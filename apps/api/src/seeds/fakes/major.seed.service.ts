import { prisma } from '@/bootstrap/db.init';
import { MajorEnum } from '@bac/db/prisma/enums';

export class MajorSeedService {
  run = async (params: { majorName: MajorEnum; id: string }) => {
    await prisma.major.upsert({
      where: { id: params.id },
      create: { id: params.id, name: params.majorName },
      update: { name: params.majorName },
    });
  };
}
