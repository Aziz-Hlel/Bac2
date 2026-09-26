import z from 'zod';

export const updateClassroomExamReqSchema = z.object({
  examIds: z.array(z.uuid()),
});

export type UpdateClassroomExamReq = z.infer<typeof updateClassroomExamReqSchema>;
