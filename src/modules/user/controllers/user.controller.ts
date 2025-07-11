import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  public static async getProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await UserService.getProfile(req.user!.id);
      res.json({
        status: 'success',
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }

  public static async updateProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await UserService.updateProfile(req.user!.id, req.body);
      res.json({
        status: 'success',
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }
} 