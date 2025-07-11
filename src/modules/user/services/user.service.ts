import { NotFoundError } from '../../../core/errors/AppError';
import { User } from '../models/User';

export class UserService {
  public static async getProfile(userId: string) {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new NotFoundError('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }

  public static async updateProfile(userId: string, data: { name?: string }) {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: data },
      { new: true }
    ).select('-password');

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }
} 