import { Role } from '@bac/db/prisma/browser';
import { genUuid } from '../helper/generateUuid';

export const userSeedData = {
  tigana: {
    id: genUuid('tigana137@gmail.com'),
    email: 'tigana137@gmail.com',
    password: '12345678',
    role: Role.ADMIN,
  },
};
