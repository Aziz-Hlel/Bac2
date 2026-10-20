import ENV from '@/config/env';
import { NODE_ENVS } from '@/config/env/NodeEnvs';
import { SeedDevService } from './dev/seedDev.service';
import { SystemSettingSeedService } from './shared/systemSetting.seed';

export class SeedService {
  constructor(
    // dev
    private readonly seedDevService: SeedDevService,
    // shared
    private readonly systemSettingSeedService: SystemSettingSeedService,

    // prod
  ) {}

  runShared = async () => {
    await this.systemSettingSeedService.run();
  };

  run = async () => {
    await this.runShared();

    switch (ENV.NODE_ENV) {
      case NODE_ENVS.dev:
        await this.seedDevService.run();
        break;
      case NODE_ENVS.production:
        break;
      default:
        break;
    }
  };
}
