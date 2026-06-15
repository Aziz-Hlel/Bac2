import { prisma } from '@/bootstrap/db.init';
import { CityEnum } from '@bac/db/prisma/enums';
import { faker } from '@faker-js/faker';

export type createSchoolSeedStrictInput = {
  id: string;
  ownerId: string;
};

export type createSchoolSeedOptionalInput = {
  name: string;
  city: CityEnum;
  publicId: string;
};

export class SchoolSeedService {
  private addFakeData(params: createSchoolSeedStrictInput & Partial<createSchoolSeedOptionalInput>) {
    return {
      ...params,
      publicId: params.publicId ?? faker.string.alphanumeric(10),
      name: params.name ?? faker.company.name(),
      city: params.city ?? faker.helpers.arrayElement(Object.values(CityEnum)),
    };
  }

  run = async (params: createSchoolSeedStrictInput & Partial<createSchoolSeedOptionalInput>) => {
    const data = this.addFakeData(params);
    await prisma.school.upsert({
      where: { id: data.id },
      create: {
        id: data.id,
        userId: data.ownerId,
        publicId: data.publicId,
        name: data.name,
        city: data.city,
      },
      update: {
        publicId: data.publicId,
        name: data.name,
        city: data.city,
      },
    });
  };
}
