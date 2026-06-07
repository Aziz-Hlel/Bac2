import { Role } from '@bac/db/prisma/enums';

export type CustomClaims = {
  id: string;
  role: Role;
};
