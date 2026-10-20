import { prisma } from '@/bootstrap/db.init';
import { SystemSettingResponse } from '@bac/contracts/schemas/systemSetting/systemSettingResponse';
import { UpdateSystemSettingInput } from '@bac/contracts/schemas/systemSetting/updateSystemSettingInput';
import { parseCalendarDate } from '@bac/contracts/utils/date';
import { SystemSettingMapper } from './systemSetting.mapper';

export class SystemSettingService {
  find = async (): Promise<SystemSettingResponse> => {
    let setting = await prisma.systemSetting.findUnique({
      where: { id: 1 },
    });

    if (!setting) {
      setting = await prisma.systemSetting.create({
        data: {
          id: 1,
          isOnly: true,
          principalStartDate: null,
          principalEndDate: null,
          retakeStartDate: null,
          retakeEndDate: null,
        },
      });
    }

    return SystemSettingMapper.toResponse(setting);
  };

  update = async (payload: UpdateSystemSettingInput): Promise<SystemSettingResponse> => {
    const data = {
      principalStartDate: parseCalendarDate(payload.principalStartDate),
      principalEndDate: parseCalendarDate(payload.principalEndDate),
      retakeStartDate: parseCalendarDate(payload.retakeStartDate),
      retakeEndDate: parseCalendarDate(payload.retakeEndDate),
    };

    const setting = await prisma.systemSetting.upsert({
      where: { id: 1 },
      update: data,
      create: {
        id: 1,
        isOnly: true,
        ...data,
      },
    });

    return SystemSettingMapper.toResponse(setting);
  };
}
