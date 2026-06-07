import type { CreateTeacherRequest as CreateTeacherReq } from '@bac/contracts/schemas/teacher/createTeacherRequest';
import type { TeacherResponse } from '@bac/contracts/schemas/teacher/teacherResponse';
import type { UpdateTeacherRequest as UpdateTeacherReq } from '@bac/contracts/schemas/teacher/updateTeacherRequest';
import type { Page2 } from '@bac/contracts/types/page/Page';
import { apiService } from '../apiService';
import apiRoutes from '../routes/routes';

const teacherService = {
  create: (params: { schoolId: string; data: CreateTeacherReq }) =>
    apiService.postThrowable<TeacherResponse>(apiRoutes.teachers.create(params.schoolId), params.data),

  update: (params: { schoolId: string; id: string; data: UpdateTeacherReq }) =>
    apiService.putThrowable<TeacherResponse>(apiRoutes.teachers.update(params.schoolId, params.id), params.data),

  delete: (params: { schoolId: string; id: string }) =>
    apiService.deleteThrowable<void>(apiRoutes.teachers.delete(params.schoolId, params.id)),

  getPage: (params: { schoolId: string; searchParams: { [k: string]: string | number | Array<string> } }) =>
    apiService.getThrowable<Page2<TeacherResponse>>(apiRoutes.teachers.getPage(params.schoolId), {
      params: params.searchParams,
    }),
};

export default teacherService;
