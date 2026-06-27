import type { ClassResponse } from '@bac/contracts/schemas/class/classResponse';
import type { CreateClassRequest } from '@bac/contracts/schemas/class/createClassRequest';
import type { UpdateClassRequest } from '@bac/contracts/schemas/class/updateClassRequest';
import type { ExamSessionRes } from '@bac/contracts/schemas/examSession/response';
import type { Page2 } from '@bac/contracts/types/page/Page';
import { apiService } from '../apiService';
import apiRoutes from '../routes/routes';

const classroomService = {
  create: (params: { schoolId: string; data: CreateClassRequest }) =>
    apiService.postThrowable<ClassResponse>(apiRoutes.classroom.create(params.schoolId), params.data),

  update: (params: { schoolId: string; id: string; data: UpdateClassRequest }) =>
    apiService.putThrowable<ClassResponse>(apiRoutes.classroom.update(params.schoolId, params.id), params.data),

  delete: (params: { schoolId: string; id: string }) =>
    apiService.deleteThrowable<void>(apiRoutes.classroom.delete(params.schoolId, params.id)),

  getPage: (params: { schoolId: string; searchParams: { [k: string]: string | number | Array<string> } }) =>
    apiService.getThrowable<Page2<ClassResponse>>(apiRoutes.classroom.getPage(params.schoolId), {
      params: params.searchParams,
    }),

  getExams: (params: { schoolId: string; id: string }) =>
    apiService.getThrowable<{ data: ExamSessionRes[] }>(apiRoutes.classroom.exams(params.schoolId, params.id)),
};

export default classroomService;
