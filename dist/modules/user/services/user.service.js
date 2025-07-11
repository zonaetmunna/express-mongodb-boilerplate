"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const AppError_1 = require("../../../core/errors/AppError");
const User_1 = require("../models/User");
class UserService {
    static async getProfile(userId) {
        const user = await User_1.User.findById(userId).select('-password');
        if (!user) {
            throw new AppError_1.NotFoundError('User not found');
        }
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        };
    }
    static async updateProfile(userId, data) {
        const user = await User_1.User.findByIdAndUpdate(userId, { $set: data }, { new: true }).select('-password');
        if (!user) {
            throw new AppError_1.NotFoundError('User not found');
        }
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        };
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map