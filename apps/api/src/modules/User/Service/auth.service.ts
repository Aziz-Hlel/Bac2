import { Role } from '@/generated/prisma/enums';
import { AuthResponse } from '@bac/contracts/schemas/auth/authResponse';
import { InternalServerError } from '../../../err/customErrors';
import { firebaseAuthService } from '../../../firebase/service/firebase.auth.service';
import { DecodedIdTokenWithClaims } from '../../../types/auth/DecodedIdTokenWithClaims';
import UserMapper from '../mapper/user.mapper';
import { UserService } from './user.service';

export interface IAuthService {
  registerUser(tokenId: string): Promise<AuthResponse>;
  authenticateWithPassword(tokenId: string): Promise<AuthResponse>;
  authenticateWithProvider(tokenId: string): Promise<AuthResponse>;
  me(decodedToken: DecodedIdTokenWithClaims): Promise<AuthResponse>;
}

export class AuthService implements IAuthService {
  constructor(private readonly userInternalService: UserService) {}
  private firebaseService = firebaseAuthService;

  async registerUser(tokenId: string): Promise<AuthResponse> {
    const decodedToken = await this.firebaseService.verifyToken(tokenId);

    let email = decodedToken.email as string;

    const isEmailExist = await this.userInternalService.isUserEmailExists(email);

    if (isEmailExist)
      throw new InternalServerError(
        `New User registered with auth Provider but account email already exists in the system.
        authId: ${decodedToken.uid}, email: ${email}`,
      );

    const userToCreate = UserMapper.toUserCreateInput(decodedToken);
    const newUser = await this.userInternalService.createUser({ ...userToCreate, role: Role.ADMIN });

    await this.firebaseService.setCustomUserClaims({
      userId: newUser.id,
      userAuthId: newUser.authId,
      userRole: newUser.role,
    });

    const userWithNoProfileAndSchool = { ...newUser, profile: null, school: null };

    return UserMapper.toLoginResponse(userWithNoProfileAndSchool, decodedToken.picture || null);
  }

  async authenticateWithPassword(tokenId: string): Promise<AuthResponse> {
    const decodedToken = await this.firebaseService.verifyToken(tokenId);

    const userAuthId = decodedToken.uid;

    const user = await this.userInternalService.findByAuthIdWithProfileAndSchool(userAuthId);

    if (!user) {
      throw new InternalServerError(`User with authId ${userAuthId} does not exist in the system.`);
    }

    // * added it temperarly, just a quick fix 
    await this.firebaseService.setCustomUserClaims({
      userId: user.id,
      userAuthId: user.authId,
      userRole: user.role,
    });

    return UserMapper.toLoginResponse(user, decodedToken.picture || null);
  }

  async authenticateWithProvider(tokenId: string): Promise<AuthResponse> {
    const decodedToken = await this.firebaseService.verifyToken(tokenId);

    const userAuthId = decodedToken.uid;
    console.log('user auth id', userAuthId);
    let user = await this.userInternalService.findByAuthIdWithProfileAndSchool(userAuthId);

    if (!user) {
      const userToCreate = UserMapper.toUserCreateInput(decodedToken);
      const createdUser = await this.userInternalService.createUser({ ...userToCreate, role: Role.ADMIN });
      user = { ...createdUser, profile: null, school: null };
      await this.firebaseService.setCustomUserClaims({
        userId: createdUser.id,
        userAuthId: createdUser.authId,
        userRole: createdUser.role,
      });
    }

    return UserMapper.toLoginResponse(user, decodedToken.picture || null);
  }

  async me(decodedToken: DecodedIdTokenWithClaims): Promise<AuthResponse> {
    const userAuthId = decodedToken.uid;

    const user = await this.userInternalService.findByAuthIdWithProfileAndSchool(userAuthId);

    if (!user) {
      throw new InternalServerError(
        `User with authId ${userAuthId} registered in auth provider but does not exist in the system.`,
      );
    }
    const isValidClaims = this.firebaseService.validateCustomClaims(user, decodedToken);
    if (!isValidClaims) {
      await this.firebaseService.setCustomUserClaims({
        userId: user.id,
        userAuthId: user.authId,
        userRole: user.role,
      });
    }
    return UserMapper.toLoginResponse(user, decodedToken.picture || null);
  }
}
