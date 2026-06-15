import { prisma } from '@/bootstrap/db.init';

export class classroomSeedService {
  run = async (params: { id: string; name: string; schoolId: string }) => {
    await prisma.class.upsert({
      where: {
        id: params.id,
      },
      create: {
        id: params.id,
        name: params.name,
        schoolId: params.schoolId,
      },
      update: {},
    });
  };
}
