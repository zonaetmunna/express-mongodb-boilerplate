import { Document, FilterQuery, Model, QueryOptions, UpdateQuery } from 'mongoose';
export declare abstract class BaseService<T extends Document> {
    protected model: Model<T>;
    constructor(model: Model<T>);
    create(data: Partial<T>): Promise<T>;
    findById(id: string): Promise<T | null>;
    findByIdOrThrow(id: string): Promise<T>;
    findOne(filter: FilterQuery<T>): Promise<T | null>;
    findOneOrThrow(filter: FilterQuery<T>): Promise<T>;
    find(filter?: FilterQuery<T>, options?: QueryOptions): Promise<T[]>;
    findWithPagination(filter?: FilterQuery<T>, page?: number, limit?: number, sort?: any): Promise<{
        data: T[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    updateById(id: string, update: UpdateQuery<T>): Promise<T | null>;
    updateByIdOrThrow(id: string, update: UpdateQuery<T>): Promise<T>;
    deleteById(id: string): Promise<T | null>;
    deleteByIdOrThrow(id: string): Promise<T>;
    exists(filter: FilterQuery<T>): Promise<boolean>;
    count(filter?: FilterQuery<T>): Promise<number>;
}
//# sourceMappingURL=BaseService.d.ts.map