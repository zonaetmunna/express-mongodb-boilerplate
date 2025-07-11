"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidPassword = exports.isValidEmail = exports.sanitizeInput = exports.validateRequest = void 0;
const zod_1 = require("zod");
const AppError_1 = require("./AppError");
const validateRequest = (schema, req) => {
    try {
        return schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            const errorMessage = error.errors
                .map((err) => `${err.path.join('.')}: ${err.message}`)
                .join(', ');
            throw new AppError_1.ValidationError(errorMessage);
        }
        throw error;
    }
};
exports.validateRequest = validateRequest;
const sanitizeInput = (input) => {
    return input.trim().replace(/[<>]/g, '');
};
exports.sanitizeInput = sanitizeInput;
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
exports.isValidEmail = isValidEmail;
const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};
exports.isValidPassword = isValidPassword;
//# sourceMappingURL=validation.js.map