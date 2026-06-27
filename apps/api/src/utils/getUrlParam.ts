import { BadRequestError } from '@/err/customErrors';
import { Request } from 'express';
import z from 'zod';
import capitalize from './capitalize';

const getUrlParam = (req: Request, param: string, { isUuid }: { isUuid?: boolean } = { isUuid: true }): string => {
  const paramValue = req.params[param];
  if (paramValue === undefined) throw new BadRequestError(`${capitalize(param)} is required in params`);
  if (typeof paramValue !== 'string') throw new BadRequestError(`${capitalize(param)} must be a string`);

  if (isUuid && !z.uuid().safeParse(paramValue).success)
    throw new BadRequestError(`${capitalize(param)} must be a UUID`);

  return paramValue;
};

export default getUrlParam;
