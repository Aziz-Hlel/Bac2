import z from 'zod';

export const systemSettingBaseSchema = {
  principalStartDate: z.iso.date(),
  principalEndDate: z.iso.date(),
  retakeStartDate: z.iso.date(),
  retakeEndDate: z.iso.date(),
};
