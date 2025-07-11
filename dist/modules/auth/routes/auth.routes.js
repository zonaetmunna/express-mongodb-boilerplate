"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("@/core/middleware");
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_validator_1 = require("../validators/auth.validator");
const router = (0, express_1.Router)();
router.post('/register', (0, middleware_1.validate)(auth_validator_1.registerSchema), auth_controller_1.registerHandler);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map