"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
class UserController {
    static async getProfile(req, res, next) {
        try {
            const user = await user_service_1.UserService.getProfile(req.user.id);
            res.json({
                status: 'success',
                data: { user },
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async updateProfile(req, res, next) {
        try {
            const user = await user_service_1.UserService.updateProfile(req.user.id, req.body);
            res.json({
                status: 'success',
                data: { user },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map