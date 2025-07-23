import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Habit } from './schemas/habit.schema';

@Injectable()
export class HabitsService {
  constructor(@InjectModel(Habit.name) private habitModel: Model<Habit>) {}

  async create(habit: Partial<Habit>): Promise<Habit> {
    return this.habitModel.create(habit);
  }

  async findAllByUser(userId: string, { limit, page }): Promise<Habit[]> {
    return this.habitModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  async update(
    id: string,
    userId: string,
    update: Partial<Habit>
  ): Promise<Habit> {
    const habit = await this.habitModel.findOne({ _id: id, userId });
    if (!habit) throw new NotFoundException('Habit not found');
    Object.assign(habit, update);
    return habit.save();
  }

  async delete(id: string, userId: string) {
    const result = await this.habitModel.deleteOne({ _id: id, userId }).exec();
    if (result.deletedCount === 0)
      throw new NotFoundException('Habit not found');
    return { success: true };
  }

  /** Marque comme fait à une date (évite doublons) */
  async markAsDone(id: string, userId: string, date: string) {
    const habit = await this.habitModel.findOne({ _id: id, userId });
    if (!habit) throw new NotFoundException('Habit not found');
    if (!habit.dates.includes(date)) habit.dates.push(date);
    return habit.save();
  }
}
