import type { CreateUserProfileRequest } from '@bac/contracts/schemas/profile/createUserProfileRequest';
import type { UpdateUserProfileRequest } from '@bac/contracts/schemas/profile/updateUserProfileRequest';
import type { UserProfileResponse } from '@bac/contracts/schemas/profile/UserProfileResponse';
import type { UserProfileRowResponse } from '@bac/contracts/schemas/user/UserRowResponse';
import type { Page } from '@bac/contracts/types/page/Page';
import { apiService } from '../apiService';
import apiRoutes from '../routes/routes';

const userService = {
  getUsers: async (searchParams: { [k: string]: string | number | Array<string> }) =>
    apiService.getThrowable<Page<UserProfileRowResponse>>(apiRoutes.users.getUsers(), {
      params: searchParams,
    }),

  createUserProfile: async (payload: CreateUserProfileRequest) => {
    return apiService.postThrowable<UserProfileResponse>(apiRoutes.users.createUserProfile(), payload);
  },

  updateUserProfile: async ({ id, payload }: { id: string; payload: UpdateUserProfileRequest }) => {
    return apiService.putThrowable<UserProfileResponse>(apiRoutes.users.updateUserProfile(id), payload);
  },

  deleteUserProfile: async (id: string) => {
    return apiService.deleteThrowable<void>(apiRoutes.users.deleteUserProfile(id));
  },

  disableUser: async (id: string) => {
    return apiService.postThrowable<void>(apiRoutes.users.disableUser(id), {});
  },

  enableUser: async (id: string) => {
    return apiService.postThrowable<void>(apiRoutes.users.enableUser(id), {});
  },
};

export default userService;
