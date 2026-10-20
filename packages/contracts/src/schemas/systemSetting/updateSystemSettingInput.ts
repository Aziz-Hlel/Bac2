import { z } from 'zod';
import { systemSettingBaseSchema } from '../../base/systemSetting.base-schema';

export const updateSystemSettingInputSchema = z
  .object({
    principalStartDate: systemSettingBaseSchema.principalStartDate,
    principalEndDate: systemSettingBaseSchema.principalEndDate,
    retakeStartDate: systemSettingBaseSchema.retakeStartDate,
    retakeEndDate: systemSettingBaseSchema.retakeEndDate,
  })
  .refine((data) => data.principalEndDate >= data.principalStartDate, {
    message: 'Principal session end date must be after principal session start date',
  })
  .refine((data) => data.retakeEndDate >= data.retakeStartDate, {
    message: 'Retake session end date must be after retake session start date',
  })
  .refine((data) => data.principalEndDate < data.retakeStartDate, {
    message: 'Principal session end date must be before retake session start date',
  });

export type UpdateSystemSettingInput = z.infer<typeof updateSystemSettingInputSchema>;
