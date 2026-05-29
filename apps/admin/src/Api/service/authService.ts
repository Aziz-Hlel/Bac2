import { apiService } from '@/Api/apiService';
import type { ApiResponse } from '@/types22/api/ApiResponse';
import type { FirebaseSignInRequestDto } from '@/types22/auth/SignInRequestDto';
import type { SignInResponseDto } from '@/types22/auth/SignInResponseDto';
import type { SignUpResponseDto } from '@/types22/auth/SignUpResponseDto';
import type { UserProfileResponse } from '@bac/contracts/schemas/profile/UserProfileResponse';
import type { FirebaseSignUpRequestSchema } from 'src/types22/auth/SignUpRequestDto';
import apiRoutes from '../routes/routes';

export interface IauthService {
  signIn: (payload: FirebaseSignInRequestDto) => Promise<ApiResponse<SignInResponseDto>>;

  signUp: (payload: FirebaseSignUpRequestSchema) => Promise<ApiResponse<SignUpResponseDto>>;

  oAuthSignIn: (payload: FirebaseSignInRequestDto) => Promise<ApiResponse<SignInResponseDto>>;

  me: () => Promise<ApiResponse<UserProfileResponse>>;
}

export const authService: IauthService = {
  signIn: (payload) => {
    return apiService.post<SignInResponseDto>(apiRoutes.auth.signIn(), payload);
  },
  signUp: (payload) => {
    return apiService.post<SignUpResponseDto>(apiRoutes.auth.signUp(), payload);
  },
  oAuthSignIn: (payload) => {
    return apiService.post<SignInResponseDto>(apiRoutes.auth.oAuthSignIn(), payload);
  },
  me: () => {
    return apiService.get(apiRoutes.auth.me());
  },
};
