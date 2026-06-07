import { prisma } from '@/bootstrap/db.init';
import { CreateProfileRequest } from '@bac/contracts/schemas/profile/createProfileRequest';
import { ProfileInclude } from '@bac/db/prisma/models';
import { DefaultArgs } from '@prisma/client/runtime/client';
import { ProfileWithUser } from '../types';

export class ProfileRepo {
  private includeUser = () => {
    return {
      user: true,
    } as const satisfies ProfileInclude<DefaultArgs>;
  };
  async create(userId: string, schema: CreateProfileRequest): Promise<ProfileWithUser> {
    const profile = await prisma.profile.create({
      data: {
        ...schema,
        userId,
      },
      include: this.includeUser(),
    });
    return profile;
  }
}
