import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../../../config/environment';
import { BadRequestError, UnauthorizedError } from '../../../core/errors/AppError';
import { User } from '../../user/models/User';
import { IAuthResponse, ILoginRequest, IRegisterRequest } from '../types';

const generateToken = (userId: string): string => {
  const payload = { id: userId };
  const options: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  };

  return jwt.sign(payload, env.JWT_SECRET, options);
};

export const register = async (data: IRegisterRequest): Promise<IAuthResponse> => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new BadRequestError('Email already registered');
  }

  const user = await User.create({
    email: data.email,
    password: data.password,
    name: data.name,
  });

  const token = generateToken(user.id);

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    token,
  };
};

export const login = async (data: ILoginRequest): Promise<IAuthResponse> => {
  const user = await User.findOne({ email: data.email });
  if (!user) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const isPasswordValid = await user.comparePassword(data.password);
  if (!isPasswordValid) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const token = generateToken(user.id);

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    token,
  };
};
