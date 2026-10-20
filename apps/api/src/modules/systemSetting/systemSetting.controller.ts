import { updateSystemSettingInputSchema } from '@bac/contracts/schemas/systemSetting/updateSystemSettingInput';
import { Request, Response } from 'express';
import { SystemSettingService } from './systemSetting.service';

export class SystemSettingController {
  constructor(private readonly systemSettingService: SystemSettingService) {}

  find = async (_req: Request, res: Response) => {
    const setting = await this.systemSettingService.find();
    res.json(setting);
  };

  update = async (req: Request, res: Response) => {
    const payload = updateSystemSettingInputSchema.parse(req.body);
    const setting = await this.systemSettingService.update(payload);
    res.json(setting);
  };
}
