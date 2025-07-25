import { Model } from 'mongoose';

import { HabitsService } from './habits.service';
import { Habit } from './schemas/habit.schema';

jest.mock('mongoose');

describe('HabitsService', () => {
  let service: HabitsService;
  let habitModel: jest.Mocked<Model<Habit>>;

  beforeEach(() => {
    habitModel = {
      create: jest.fn(),
      find: jest.fn(),
      findOneAndUpdate: jest.fn(),
      deleteOne: jest.fn(),
    } as any;
    service = new HabitsService(habitModel);
  });

  describe('create', () => {
    it('should create a habit', async () => {
      const habit = { name: 'Test Habit' };
      const createdHabit = { ...habit, _id: '1' } as Habit;
      habitModel.create.mockResolvedValue(createdHabit as any);

      const result = await service.create(habit);
      expect(habitModel.create).toHaveBeenCalledWith(habit);
      expect(result).toEqual(createdHabit);
    });
  });

  describe('findAllByUser', () => {
    it('should return habits for a user', async () => {
      const userId = 'user1';
      const habits = [{ _id: '1', userId }] as Habit[];
      const execMock = jest.fn().mockResolvedValue(habits);
      habitModel.find.mockReturnValue({ exec: execMock } as any);

      const result = await service.findAllByUser(userId);
      expect(habitModel.find).toHaveBeenCalledWith({ userId });
      expect(result).toEqual(habits);
    });
  });

  describe('update', () => {
    it('should update a habit', async () => {
      const id = '1';
      const userId = 'user1';
      const update = { name: 'Updated Habit' };
      const updatedHabit = { _id: id, userId, ...update } as Habit;
      const execMock = jest.fn().mockResolvedValue(updatedHabit);
      habitModel.findOneAndUpdate.mockReturnValue({ exec: execMock } as any);

      const result = await service.update(id, userId, update);
      expect(habitModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: id, userId },
        update,
        { new: true }
      );
      expect(result).toEqual(updatedHabit);
    });
  });

  describe('delete', () => {
    it('should delete a habit', async () => {
      const id = '1';
      const userId = 'user1';
      const execMock = jest.fn().mockResolvedValue({ deletedCount: 1 });
      habitModel.deleteOne.mockReturnValue({ exec: execMock } as any);

      const result = await service.delete(id, userId);
      expect(habitModel.deleteOne).toHaveBeenCalledWith({ _id: id, userId });
      expect(result).toEqual({ deletedCount: 1 });
    });
  });
});
