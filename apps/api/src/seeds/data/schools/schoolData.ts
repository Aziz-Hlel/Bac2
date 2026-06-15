import { createSchoolSeedStrictInput } from '@/seeds/fakes/school.seed.service';
import { genUuid } from '@/seeds/helper/generateUuid';
import userSeedData from '../users/userData';

export const schoolSeedData = {
  tiganaSchool: {
    id: genUuid('tiganaSchool'),
    ownerId: userSeedData.tigana.id,
  },
} as const satisfies Record<string, createSchoolSeedStrictInput>;
