import type { MajorEnum } from '../../types/enums/enums';
import type { ElectiveExamEnum_V2 } from '../../types/enums/selectiveExams';
import type { SchoolResponse } from './schoolResponse';

export type SchoolResponseWithDetails = SchoolResponse & {
  majors: {
    id: string;
    name: MajorEnum;
    nbrClasses: number;
  }[];
  electiveExams: {
    id: string;
    name: ElectiveExamEnum_V2;
    nbrClasses: number;
  }[];
};
