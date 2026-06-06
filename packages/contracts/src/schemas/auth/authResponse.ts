import type { ProfileResponse } from '../profile/ProfileResponse';
import type { SchoolResponse } from '../school/schoolResponse';
import type { UserResponse } from '../user/UserResponse';

export type AuthResponse = UserResponse & {
  profile: ProfileResponse | null;
  school: SchoolResponse | null;
};
