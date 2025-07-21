import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Habit } from './schemas/habit.schema';

@Injectable()
export class HabitsService {
  constructor(@InjectModel(Habit.name) private habitModel: Model<Habit>) {}

  async create(habit: Partial<Habit>): Promise<Habit> {
    return this.habitModel.create(habit);
  }

  async findAllByUser(userId: string): Promise<Habit[]> {
    return this.habitModel.find({ userId }).exec();
  }

  async update(
    id: string,
    userId: string,
    update: Partial<Habit>
  ): Promise<Habit> {
    return this.habitModel
      .findOneAndUpdate({ _id: id, userId }, update, { new: true })
      .exec();
  }

  async delete(id: string, userId: string) {
    return this.habitModel.deleteOne({ _id: id, userId }).exec();
  }
}
