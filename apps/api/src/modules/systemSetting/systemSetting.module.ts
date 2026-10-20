import { SystemSettingController } from './systemSetting.controller';
import { createSystemSettingRouter } from './systemSetting.route';
import { SystemSettingService } from './systemSetting.service';

export const createSystemSettingModule = () => {
  const systemSettingService = new SystemSettingService();
  const systemSettingController = new SystemSettingController(systemSettingService);
  const systemSettingRouter = createSystemSettingRouter(systemSettingController);
  return { systemSettingRouter, systemSettingService };
};
