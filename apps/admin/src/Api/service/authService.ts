import { apiService } from '@/Api/apiService';
import type { ApiResponse } from '@/types/api/ApiResponse';
import type { FirebaseSignInRequestDto } from '@/types/auth/SignInRequestDto';
import type { FirebaseSignUpRequestSchema } from '@/types/auth/SignUpRequestDto';
import type { AuthResponse } from '@bac/contracts/schemas/auth/authResponse';
import apiRoutes from '../routes/routes';

export interface IauthService {
  signIn: (payload: FirebaseSignInRequestDto) => Promise<ApiResponse<AuthResponse>>;

  signUp: (payload: FirebaseSignUpRequestSchema) => Promise<ApiResponse<AuthResponse>>;

  oAuthSignIn: (payload: FirebaseSignInRequestDto) => Promise<ApiResponse<AuthResponse>>;

  me: () => Promise<ApiResponse<AuthResponse>>;
}

export const authService: IauthService = {
  signIn: (payload) => {
    return apiService.post<AuthResponse>(apiRoutes.auth.signIn(), payload);
  },
  signUp: (payload) => {
    return apiService.post<AuthResponse>(apiRoutes.auth.signUp(), payload);
  },
  oAuthSignIn: (payload) => {
    return apiService.post<AuthResponse>(apiRoutes.auth.oAuthSignIn(), payload);
  },
  me: () => {
    return apiService.get<AuthResponse>(apiRoutes.auth.me());
  },
};
