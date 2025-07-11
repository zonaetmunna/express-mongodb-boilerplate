import { NotFoundError } from '@/core/utils';
import { Document, FilterQuery, Model, QueryOptions, UpdateQuery } from 'mongoose';

export abstract class BaseService<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async findByIdOrThrow(id: string): Promise<T> {
    const document = await this.findById(id);
    if (!document) {
      throw new NotFoundError(`${this.model.modelName} not found`);
    }
    return document;
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter);
  }

  async findOneOrThrow(filter: FilterQuery<T>): Promise<T> {
    const document = await this.findOne(filter);
    if (!document) {
      throw new NotFoundError(`${this.model.modelName} not found`);
    }
    return document;
  }

  async find(filter: FilterQuery<T> = {}, options: QueryOptions = {}): Promise<T[]> {
    return this.model.find(filter, null, options);
  }

  async findWithPagination(
    filter: FilterQuery<T> = {},
    page = 1,
    limit = 10,
    sort: any = { createdAt: -1 }
  ): Promise<{
    data: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
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

  async updateById(id: string, update: UpdateQuery<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, update, { new: true });
  }

  async updateByIdOrThrow(id: string, update: UpdateQuery<T>): Promise<T> {
    const document = await this.updateById(id, update);
    if (!document) {
      throw new NotFoundError(`${this.model.modelName} not found`);
    }
    return document;
  }

  async deleteById(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id);
  }

  async deleteByIdOrThrow(id: string): Promise<T> {
    const document = await this.deleteById(id);
    if (!document) {
      throw new NotFoundError(`${this.model.modelName} not found`);
    }
    return document;
  }

  async exists(filter: FilterQuery<T>): Promise<boolean> {
    const count = await this.model.countDocuments(filter);
    return count > 0;
  }

  async count(filter: FilterQuery<T> = {}): Promise<number> {
    return this.model.countDocuments(filter);
  }
}