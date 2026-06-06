import classroomService from '@/Api/service/classroomService';
import { createClassRequestSchema } from '@bac/contracts/schemas/class/createClassRequest';
import { updateClassRequestSchema } from '@bac/contracts/schemas/class/updateClassRequest';
import type { z } from 'zod';
import { TableData } from './core';
import { defaultQuery, queryParamsSchema, type TableRowType } from './types';

export type schemasType = {
  create: z.infer<typeof createClassRequestSchema>;
  update: z.infer<typeof updateClassRequestSchema>;
  delete: typeof classroomService.delete;
  getPage: typeof classroomService.getPage;
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
  fn: classroomService.create,
  schema: createClassRequestSchema,
  mutationKey: () => [TableData.MODULE_NAME, 'create'],
  defaultValues: () => {
    return {
      name: '',
    };
  },
});

const update = defineOperation({
  fn: classroomService.update,
  schema: updateClassRequestSchema,
  mutationKey: () => [TableData.MODULE_NAME, 'update'],
  defaultValues: (moduleInstance: TableRowType) => ({
    name: moduleInstance.name,
  }),
});

const deleteOperation = {
  fn: classroomService.delete,
  mutationKey: () => [TableData.MODULE_NAME, 'delete'],
};

const getPage = defineOperation({
  fn: classroomService.getPage,
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
