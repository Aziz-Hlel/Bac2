import { Prettify } from '@bac/contracts/utils/Prettify';
import { ProfileGetPayload, UserGetPayload } from '@bac/db/prisma/models';

export type UserWithProfile = Prettify<UserGetPayload<{ include: { profile: true } }>>;
export type ProfileWithUser = Prettify<ProfileGetPayload<{ include: { user: true } }>>;
