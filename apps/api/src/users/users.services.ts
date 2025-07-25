import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: Partial<User>): Promise<User> {
    return this.userModel.create(user);
  }

  async findBySub(sub: string): Promise<User | null> {
    return this.userModel
      .findOne({
        sub,
      })
      .exec();
  }

  async update(id: string, sub: string, update: Partial<User>): Promise<User> {
    const user = await this.userModel.findOne({ _id: id, sub });
    if (!user) throw new NotFoundException('User not found');
    Object.assign(user, update);
    return user.save();
  }

  async delete(id: string, sub: string) {
    const result = await this.userModel.deleteOne({ _id: id, sub }).exec();
    if (result.deletedCount === 0)
      throw new NotFoundException('User not found');
    return { success: true };
  }
}
