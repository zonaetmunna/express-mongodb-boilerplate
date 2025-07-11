"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const utils_1 = require("@/core/utils");
const zod_1 = require("zod");
const validate = (schema) => {
    return (0, utils_1.asyncHandler)(async (req, res, next) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                const errorMessage = error.errors
                    .map((err) => `${err.path.join('.')}: ${err.message}`)
                    .join(', ');
                throw new utils_1.ValidationError(errorMessage);
            }
            throw error;
        }
    });
};
exports.validate = validate;
//# sourceMappingURL=validation.middleware.js.map