import type { SystemSettingResponse } from '@bac/contracts/schemas/systemSetting/systemSettingResponse';
import type { UpdateSystemSettingInput } from '@bac/contracts/schemas/systemSetting/updateSystemSettingInput';
import { apiService } from '../apiService';
import apiRoutes from '../routes/routes';

const systemSettingService = {
  get: async () => apiService.getThrowable<SystemSettingResponse>(apiRoutes.systemSetting.get()),

  find: async () => apiService.getThrowable<SystemSettingResponse>(apiRoutes.systemSetting.get()),

  update: async (data: UpdateSystemSettingInput) =>
    apiService.putThrowable<SystemSettingResponse>(apiRoutes.systemSetting.update(), data),
};

export default systemSettingService;
