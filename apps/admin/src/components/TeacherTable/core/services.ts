import teacherService from '@/Api/service/teacherService';
import { createTeacherRequestSchema } from '@bac/contracts/schemas/teacher/createTeacherRequest';
import { updateTeacherRequestSchema } from '@bac/contracts/schemas/teacher/updateTeacherRequest';
import type { z } from 'zod';
import { TableData } from './core';
import { defaultQuery, queryParamsSchema, type TableRowType } from './types';

export type schemasType = {
  create: z.infer<typeof createTeacherRequestSchema>;
  update: z.infer<typeof updateTeacherRequestSchema>;
  delete: typeof teacherService.delete;
  getPage: typeof teacherService.getPage;
};

function defineOperation<TSchema extends z.ZodType, TFn, T, K>(config: {
  fn: TFn;
  schema: TSchema;
  mutationKey: (arg: K) => string[];
  defaultValues: (params: T) => z.infer<TSchema>;
}) {
  return config;
}

const create = defineOperation({
  fn: teacherService.create,
  schema: createTeacherRequestSchema,
  mutationKey: () => [TableData.MODULE_NAME, 'create'],
  defaultValues: () => {
    return {
      publicId: '',
      firstName: '',
      lastName: '',
      isTeacher: true as const,
      subject: undefined,
    };
  },
});

const update = defineOperation({
  fn: teacherService.update,
  schema: updateTeacherRequestSchema,
  mutationKey: () => [TableData.MODULE_NAME, 'update'],
  defaultValues: (moduleInstance: TableRowType) => ({
    publicId: moduleInstance.publicId,
    firstName: moduleInstance.firstName,
    lastName: moduleInstance.lastName,
    isTeacher: moduleInstance.isTeacher,
    subject: moduleInstance.subject,
  }),
});

const deleteOperation = {
  fn: teacherService.delete,
  mutationKey: () => [TableData.MODULE_NAME, 'delete'],
};

const getPage = defineOperation({
  fn: teacherService.getPage,
  mutationKey: () => [TableData.MODULE_NAME, 'getPage'],
  schema: queryParamsSchema,
  defaultValues: () => defaultQuery,
});

type OperationsReqFields = {
  [x: string]: {
    mutationKey: (...args: any[]) => string[];
  };
};

export const operations = {
  create: create,
  update: update,
  delete: deleteOperation,
  getPage: getPage,
} as const satisfies OperationsReqFields;
