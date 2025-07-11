"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_1 = require("../../../config/environment");
const AppError_1 = require("../../../core/errors/AppError");
const User_1 = require("../../user/models/User");
const generateToken = (userId) => {
    const payload = { id: userId };
    const options = {
        expiresIn: environment_1.env.JWT_EXPIRES_IN,
    };
    return jsonwebtoken_1.default.sign(payload, environment_1.env.JWT_SECRET, options);
};
const register = async (data) => {
    const existingUser = await User_1.User.findOne({ email: data.email });
    if (existingUser) {
        throw new AppError_1.BadRequestError('Email already registered');
    }
    const user = await User_1.User.create({
        email: data.email,
        password: data.password,
        name: data.name,
    });
    const token = generateToken(user.id);
    return {
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        },
        token,
    };
};
exports.register = register;
const login = async (data) => {
    const user = await User_1.User.findOne({ email: data.email });
    if (!user) {
        throw new AppError_1.UnauthorizedError('Invalid credentials');
    }
    const isPasswordValid = await user.comparePassword(data.password);
    if (!isPasswordValid) {
        throw new AppError_1.UnauthorizedError('Invalid credentials');
    }
    const token = generateToken(user.id);
    return {
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        },
        token,
    };
};
exports.login = login;
//# sourceMappingURL=auth.service.js.map