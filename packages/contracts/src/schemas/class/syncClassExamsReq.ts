import z from 'zod';

export const SyncClassExamsReqSchema = z.object({
  examIds: z.array(z.uuid()),
});

export type SyncClassExamsReq = z.infer<typeof SyncClassExamsReqSchema>;
