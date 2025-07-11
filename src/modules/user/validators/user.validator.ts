import { z } from 'zod';

export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  }),
});

export type UpdateProfileRequest = z.infer<typeof updateProfileSchema>['body']; 