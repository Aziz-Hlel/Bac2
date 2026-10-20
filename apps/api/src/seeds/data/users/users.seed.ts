import { genUuid } from '@/seeds/helper/generateUuid';
import { Role } from '@bac/db/prisma/browser';

export const userSeedData = {
  tigana: {
    id: genUuid('tigana137@gmail.com'),
    email: 'tigana137@gmail.com',
    password: '12345678',
    role: Role.ADMIN,
  },
};
