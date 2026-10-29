import z from 'zod';

export const systemSettingBaseSchema = {
  principalStartDate: z.iso.date('Principal session start date is required'),
  principalEndDate: z.iso.date('Principal session end date is required'),
  retakeStartDate: z.iso.date('Retake session start date is required'),
  retakeEndDate: z.iso.date('Retake session end date is required'),
};
