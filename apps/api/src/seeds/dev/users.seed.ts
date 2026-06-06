import { Role } from '@/generated/prisma/browser';
import { genUuid } from '../helper/generateUuid';

export const userSeedData = {
  SuperAdmin: {
    id: genUuid('m.aziz.hlel@gmail.com'),
    email: 'm.aziz.hlel@gmail.com',
    role: Role.SUPER_ADMIN,
  },
  tigana: {
    id: genUuid('tigana137@gmail.com'),
    email: 'tigana137@gmail.com',
    role: Role.ADMIN,
  },
};
