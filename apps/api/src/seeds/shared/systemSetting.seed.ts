import { prisma } from '@/bootstrap/db.init';

export class SystemSettingSeedService {
  public run = async () => {
    const systemSetting = await prisma.systemSetting.findUnique({
      where: {
        id: 1,
        isOnly: true,
      },
    });
    if (systemSetting) {
      return;
    }
    await prisma.systemSetting.create({
      data: {
        isOnly: true,
        principalStartDate: null,
        principalEndDate: null,
        retakeStartDate: null,
        retakeEndDate: null,
      },
    });
  };
}
