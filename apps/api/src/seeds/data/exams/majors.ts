import { genUuid } from '@/seeds/helper/generateUuid';
import { MajorEnum } from '@bac/db/prisma/enums';
import { ecoExamSeed } from './exams/eco';
import { informatiqueExamsData } from './exams/informatique';
import { letterExamsData } from './exams/letter';
import { mathExamsData } from './exams/math';
import { scienceExamsData } from './exams/science';
import { sportExamsData } from './exams/sport';
import { techniqueExamsData } from './exams/technique';
import { MajorSeed } from './types';

export const majorSeedData: Record<MajorEnum, { id: string; name: MajorEnum; exams: MajorSeed }> = {
  [MajorEnum.COMPUTER_SCIENCE]: {
    id: genUuid('computer_science_major'),
    name: MajorEnum.COMPUTER_SCIENCE,
    exams: informatiqueExamsData,
  },
  [MajorEnum.LETTRE]: {
    id: genUuid('lettre_major'),
    name: MajorEnum.LETTRE,
    exams: letterExamsData,
  },
  [MajorEnum.MATH]: {
    id: genUuid('math_major'),
    name: MajorEnum.MATH,
    exams: mathExamsData,
  },
  [MajorEnum.SCIENCE]: {
    id: genUuid('science_major'),
    name: MajorEnum.SCIENCE,
    exams: scienceExamsData,
  },
  [MajorEnum.TECHNIQUE]: {
    id: genUuid('technique_major'),
    name: MajorEnum.TECHNIQUE,
    exams: techniqueExamsData,
  },
  [MajorEnum.ECO]: {
    id: genUuid('eco_major'),
    name: MajorEnum.ECO,
    exams: ecoExamSeed,
  },
  [MajorEnum.SPORT]: {
    id: genUuid('sport_major'),
    name: MajorEnum.SPORT,
    exams: sportExamsData,
  },
};
