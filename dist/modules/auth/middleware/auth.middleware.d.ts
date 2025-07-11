import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload & {
                _id: string;
            };
        }
    }
}
export declare const authenticate: (req: Request, res: Response, next: NextFunction) => void;
export declare const authorize: (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => void;
export declare const optionalAuth: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middleware.d.ts.map