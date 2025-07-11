"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutHandler = exports.getProfileHandler = exports.changePasswordHandler = exports.resendEmailVerificationHandler = exports.verifyEmailHandler = exports.resetPasswordHandler = exports.forgotPasswordHandler = exports.refreshTokenHandler = exports.loginHandler = exports.registerHandler = void 0;
const utils_1 = require("@/core/utils");
const ApiResponse_1 = require("@/core/utils/ApiResponse");
const catchAsync_1 = __importDefault(require("@/core/utils/catchAsync"));
const auth_service_1 = require("../services/auth.service");
exports.registerHandler = (0, catchAsync_1.default)(async (req, res) => {
    const result = await (0, auth_service_1.register)(req.body);
    return ApiResponse_1.ApiResponse.created(res, result);
});
exports.loginHandler = (0, utils_1.asyncHandler)(async (req, res) => {
    const result = await (0, auth_service_1.login)(req.body);
    return ApiResponse_1.ApiResponse.success(res, result);
});
exports.refreshTokenHandler = (0, utils_1.asyncHandler)(async (req, res) => {
    const newToken = await generateNewToken(req.user?.id);
    return ApiResponse_1.ApiResponse.success(res, { token: newToken });
});
exports.forgotPasswordHandler = (0, utils_1.asyncHandler)(async (req, res) => {
    const { email } = req.body;
    await sendPasswordResetEmail(email);
    return ApiResponse_1.ApiResponse.success(res, { message: 'Password reset email sent' });
});
exports.resetPasswordHandler = (0, utils_1.asyncHandler)(async (req, res) => {
    const { token, newPassword } = req.body;
    await updatePassword(token, newPassword);
    return ApiResponse_1.ApiResponse.success(res, { message: 'Password reset successfully' });
});
exports.verifyEmailHandler = (0, utils_1.asyncHandler)(async (req, res) => {
    const token = req.params.token;
    if (!token) {
        throw new Error('Token is required');
    }
    await verifyEmailToken(token);
    return ApiResponse_1.ApiResponse.success(res, { message: 'Email verified successfully' });
});
exports.resendEmailVerificationHandler = (0, utils_1.asyncHandler)(async (req, res) => {
    const { email } = req.body;
    await sendVerificationEmail(email);
    return ApiResponse_1.ApiResponse.success(res, { message: 'Verification email sent' });
});
exports.changePasswordHandler = (0, utils_1.asyncHandler)(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user?.id;
    if (!userId) {
        throw new Error('User ID is required');
    }
    await updateUserPassword(userId, currentPassword, newPassword);
    return ApiResponse_1.ApiResponse.success(res, { message: 'Password changed successfully' });
});
exports.getProfileHandler = (0, utils_1.asyncHandler)(async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new Error('User ID is required');
    }
    const userProfile = await fetchUserProfile(userId);
    return ApiResponse_1.ApiResponse.success(res, { user: userProfile });
});
exports.logoutHandler = (0, utils_1.asyncHandler)(async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new Error('User ID is required');
    }
    await invalidateUserSession(userId);
    return ApiResponse_1.ApiResponse.success(res, { message: 'Logged out successfully' });
});
const TOKEN_EXPIRY = 3600;
async function generateNewToken(userId) {
    if (!userId)
        throw new Error('User ID is required');
    return 'new-token';
}
async function sendPasswordResetEmail(email) {
    return;
}
async function updatePassword(token, newPassword) {
    return;
}
async function verifyEmailToken(token) {
    return;
}
async function sendVerificationEmail(email) {
    return;
}
async function updateUserPassword(userId, currentPassword, newPassword) {
    return;
}
async function fetchUserProfile(userId) {
    return { id: userId };
}
async function invalidateUserSession(userId) {
    return;
}
//# sourceMappingURL=auth.controller.js.map