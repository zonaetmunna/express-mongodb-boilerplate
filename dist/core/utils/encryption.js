"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionUtils = void 0;
const config_1 = require("@/config");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class EncryptionUtils {
    static async hashPassword(password) {
        return bcryptjs_1.default.hash(password, config_1.env.BCRYPT_ROUNDS);
    }
    static async comparePassword(password, hash) {
        return bcryptjs_1.default.compare(password, hash);
    }
    static generateToken(payload, expiresIn = config_1.env.JWT_EXPIRES_IN) {
        const options = { expiresIn: expiresIn };
        return jsonwebtoken_1.default.sign(payload, config_1.env.JWT_SECRET, options);
    }
    static generateRefreshToken(payload) {
        const options = { expiresIn: config_1.env.JWT_REFRESH_EXPIRES_IN };
        return jsonwebtoken_1.default.sign(payload, config_1.env.JWT_REFRESH_SECRET, options);
    }
    static verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, config_1.env.JWT_SECRET);
    }
    static verifyRefreshToken(token) {
        return jsonwebtoken_1.default.verify(token, config_1.env.JWT_REFRESH_SECRET);
    }
    static generateRandomString(length = 32) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
}
exports.EncryptionUtils = EncryptionUtils;
//# sourceMappingURL=encryption.js.map