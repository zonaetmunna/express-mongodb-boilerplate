import { asyncHandler, EncryptionUtils, ForbiddenError, UnauthorizedError } from '@/core/utils';
import { User } from '@/modules/user/models/User';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';


declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { _id: string };
    }
  }
}

export const authenticate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Access token is required');
    }

    const token = authHeader.substring(7);

    try {
      const decoded = EncryptionUtils.verifyToken(token) as JwtPayload;
      
      // Check if user still exists and is active
      const user = await User.findById(decoded.userId);
      if (!user || !user.isActive) {
        throw new UnauthorizedError('Invalid token');
      }

      req.user = { ...decoded, _id: decoded.userId };
      next();
    } catch (error) {
      throw new UnauthorizedError('Invalid token');
    }
  }
);

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError('Authentication required');
    }

    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError('Insufficient permissions');
    }

    next();
  };
};

export const optionalAuth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.substring(7);

    try {
      const decoded = EncryptionUtils.verifyToken(token) as JwtPayload;
      
      const user = await User.findById(decoded.userId);
      if (user && user.isActive) {
        req.user = { ...decoded, _id: decoded.userId };
      }
    } catch (error) {
      // Ignore token errors for optional auth
    }

    next();
  }
);