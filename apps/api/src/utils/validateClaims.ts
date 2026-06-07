import { Role } from '@bac/db/prisma/enums';
import z from 'zod';

export const claimsSchema = z.object({
  id: z.uuid(),
  role: z.enum(Role),
});
