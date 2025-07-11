import { env } from '@/config';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';

export class EncryptionUtils {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, env.BCRYPT_ROUNDS);
  }

  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static generateToken(payload: object, expiresIn = env.JWT_EXPIRES_IN): string {
    const options: SignOptions = { expiresIn: expiresIn as SignOptions['expiresIn'] };
    return jwt.sign(payload, env.JWT_SECRET, options);
  }

  static generateRefreshToken(payload: object): string {
    const options: SignOptions = { expiresIn: env.JWT_REFRESH_EXPIRES_IN as SignOptions['expiresIn'] };
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, options);
  }

  static verifyToken(token: string): any {
    return jwt.verify(token, env.JWT_SECRET);
  }

  static verifyRefreshToken(token: string): any {
    return jwt.verify(token, env.JWT_REFRESH_SECRET);
  }

  static generateRandomString(length = 32): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}