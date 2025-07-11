"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuth = exports.authorize = exports.authenticate = void 0;
const utils_1 = require("@/core/utils");
const User_1 = require("@/modules/user/models/User");
exports.authenticate = (0, utils_1.asyncHandler)(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new utils_1.UnauthorizedError('Access token is required');
    }
    const token = authHeader.substring(7);
    try {
        const decoded = utils_1.EncryptionUtils.verifyToken(token);
        const user = await User_1.User.findById(decoded.userId);
        if (!user || !user.isActive) {
            throw new utils_1.UnauthorizedError('Invalid token');
        }
        req.user = { ...decoded, _id: decoded.userId };
        next();
    }
    catch (error) {
        throw new utils_1.UnauthorizedError('Invalid token');
    }
});
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            throw new utils_1.UnauthorizedError('Authentication required');
        }
        if (!roles.includes(req.user.role)) {
            throw new utils_1.ForbiddenError('Insufficient permissions');
        }
        next();
    };
};
exports.authorize = authorize;
exports.optionalAuth = (0, utils_1.asyncHandler)(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next();
    }
    const token = authHeader.substring(7);
    try {
        const decoded = utils_1.EncryptionUtils.verifyToken(token);
        const user = await User_1.User.findById(decoded.userId);
        if (user && user.isActive) {
            req.user = { ...decoded, _id: decoded.userId };
        }
    }
    catch (error) {
    }
    next();
});
//# sourceMappingURL=auth.middleware.js.map