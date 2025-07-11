"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("@/core/middleware");
const auth_middleware_1 = require("@/modules/auth/middleware/auth.middleware");
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const user_validator_1 = require("../validators/user.validator");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/profile', user_controller_1.UserController.getProfile);
router.patch('/profile', (0, middleware_1.validate)(user_validator_1.updateProfileSchema), user_controller_1.UserController.updateProfile);
exports.default = router;
//# sourceMappingURL=user.routes.js.map