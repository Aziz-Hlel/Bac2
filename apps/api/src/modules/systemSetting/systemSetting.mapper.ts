import { SystemSettingResponse } from '@bac/contracts/schemas/systemSetting/systemSettingResponse';
import { toCalendarDate } from '@bac/contracts/utils/date';
import { SystemSetting } from '@bac/db/prisma/client';

export class SystemSettingMapper {
  static toResponse(setting: SystemSetting): SystemSettingResponse {
    return {
      principalStartDate: toCalendarDate(setting.principalStartDate),
      principalEndDate: toCalendarDate(setting.principalEndDate),
      retakeStartDate: toCalendarDate(setting.retakeStartDate),
      retakeEndDate: toCalendarDate(setting.retakeEndDate),
    };
  }
}
