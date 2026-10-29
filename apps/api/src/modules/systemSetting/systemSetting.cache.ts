import { cacheService } from '@/cache/service/cache.service';
import { SystemSettingResponse } from '@bac/contracts/schemas/systemSetting/systemSettingResponse';

export class SystemSettingCache {
  async get(): Promise<SystemSettingResponse | null> {
    return cacheService.get('system_settings');
  }

  async set(settings: SystemSettingResponse) {
    await cacheService.set('system_settings', settings);
  }

  async del() {
    await cacheService.del('system_settings');
  }
}
