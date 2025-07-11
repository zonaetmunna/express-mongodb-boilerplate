"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const utils_1 = require("@/core/utils");
class BaseService {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async findById(id) {
        return this.model.findById(id);
    }
    async findByIdOrThrow(id) {
        const document = await this.findById(id);
        if (!document) {
            throw new utils_1.NotFoundError(`${this.model.modelName} not found`);
        }
        return document;
    }
    async findOne(filter) {
        return this.model.findOne(filter);
    }
    async findOneOrThrow(filter) {
        const document = await this.findOne(filter);
        if (!document) {
            throw new utils_1.NotFoundError(`${this.model.modelName} not found`);
        }
        return document;
    }
    async find(filter = {}, options = {}) {
        return this.model.find(filter, null, options);
    }
    async findWithPagination(filter = {}, page = 1, limit = 10, sort = { createdAt: -1 }) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.model.find(filter).sort(sort).skip(skip).limit(limit),
            this.model.countDocuments(filter),
        ]);
        return {
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async updateById(id, update) {
        return this.model.findByIdAndUpdate(id, update, { new: true });
    }
    async updateByIdOrThrow(id, update) {
        const document = await this.updateById(id, update);
        if (!document) {
            throw new utils_1.NotFoundError(`${this.model.modelName} not found`);
        }
        return document;
    }
    async deleteById(id) {
        return this.model.findByIdAndDelete(id);
    }
    async deleteByIdOrThrow(id) {
        const document = await this.deleteById(id);
        if (!document) {
            throw new utils_1.NotFoundError(`${this.model.modelName} not found`);
        }
        return document;
    }
    async exists(filter) {
        const count = await this.model.countDocuments(filter);
        return count > 0;
    }
    async count(filter = {}) {
        return this.model.countDocuments(filter);
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=BaseService.js.map