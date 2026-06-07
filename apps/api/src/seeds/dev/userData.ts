import { Role } from '@bac/db/prisma/enums';

export const superAdminData = [
  {
    email: 'm.aziz.hlel@gmail.com',
    password: '12345678',
    role: Role.SUPER_ADMIN,
  },
];

export const userData = [
  {
    email: 'user@gmail.com',
    password: '12345678',
    role: Role.ADMIN,
  },
];
