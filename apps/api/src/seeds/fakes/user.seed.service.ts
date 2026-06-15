import { prisma } from '@/bootstrap/db.init';
import { UserService } from '@/modules/User/Service/user.service';
import { Role } from '@bac/db/prisma/enums';
import { UserCreateInput } from '@bac/db/prisma/models';

export type UserCreateInputSeed = {
  id: string;
  email: string;
  role: Role;
  authId: string;
};

export class UserSeedService {
  constructor(private readonly userService: UserService) {}

  run = async (userData: UserCreateInput) => {
    const { user } = await this.userService.findOrCreateUser(userData);
    return user;
  };

  runV2 = async (userData: UserCreateInputSeed) => {
    await prisma.user.upsert({
      where: {
        id: userData.id,
      },
      create: {
        id: userData.id,
        email: userData.email,
        role: userData.role,
        authId: userData.authId,
        provider: 'SEED',
      },
      update: {},
    });
  };
}
