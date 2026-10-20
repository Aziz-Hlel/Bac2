import { PermissionDeniedError, UnauthorizedError } from '@/err/customErrors';
import { AuthenticatedRequest } from '@/types/auth/AuthenticatedRequest';
import { Role } from '@bac/db/prisma/enums';
import { NextFunction, Request, Response } from 'express';

const requireRole = (...roles: Role[]) => {
  return (req: Request, _: Response, next: NextFunction) => {
    const userReq = req as AuthenticatedRequest;
    if (!userReq.user) {
      throw new UnauthorizedError('Unauthenticated');
    }

    const userRole = userReq.user?.claims?.role;

    if (!userRole) {
      throw new PermissionDeniedError('User role missing');
    }

    // ? migrating away from the score thing , maybe it needed afterwards idk
    // if (PERMISSION_SCORE[userRole] < PERMISSION_SCORE[role]) {
    //   throw new PermissionDeniedError(`Insufficient permissions: required role ${role}, but user has role ${userRole}`);
    // }

    const isUserRolePrermitted = roles.includes(userRole);
    if (!isUserRolePrermitted) {
      throw new PermissionDeniedError(
        `Insufficient permissions: required roles ${roles.toString}, but user has role ${userRole}`,
      );
    }

    next();
  };
};

export default requireRole;
