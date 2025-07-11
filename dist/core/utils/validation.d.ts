import { Request } from 'express';
import { z } from 'zod';
export declare const validateRequest: <T>(schema: z.ZodSchema<T>, req: Request) => T;
export declare const sanitizeInput: (input: string) => string;
export declare const isValidEmail: (email: string) => boolean;
export declare const isValidPassword: (password: string) => boolean;
//# sourceMappingURL=validation.d.ts.map