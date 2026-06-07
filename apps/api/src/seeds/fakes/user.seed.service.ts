import { UserService } from '@/modules/User/Service/user.service';
import { UserCreateInput } from '@bac/db/prisma/models';

export class UserSeedService {
  constructor(private readonly userService: UserService) {}

  run = async (userData: UserCreateInput) => {
    const { user } = await this.userService.findOrCreateUser(userData);
    return user;
  };
}
