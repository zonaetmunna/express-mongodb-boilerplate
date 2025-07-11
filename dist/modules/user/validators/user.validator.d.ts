import { z } from 'zod';
export declare const updateProfileSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
    }, {
        name?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name?: string | undefined;
    };
}, {
    body: {
        name?: string | undefined;
    };
}>;
export type UpdateProfileRequest = z.infer<typeof updateProfileSchema>['body'];
//# sourceMappingURL=user.validator.d.ts.map