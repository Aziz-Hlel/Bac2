import type { MajorEnum } from '@bac/db/prisma/enums';

export type MajorResponse = {
  id: string;
  name: MajorEnum;
};
