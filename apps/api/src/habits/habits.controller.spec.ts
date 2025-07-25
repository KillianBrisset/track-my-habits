import { Test, TestingModule } from '@nestjs/testing';

import { HabitsController } from './habits.controller';
import { HabitsService } from './habits.service';

describe('HabitsController', () => {
  let controller: HabitsController;
  let service: HabitsService;

  const mockUser = { sub: 'user123' };
  const mockHabitsService = {
    create: jest.fn(),
    findAllByUser: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabitsController],
      providers: [{ provide: HabitsService, useValue: mockHabitsService }],
    }).compile();

    controller = module.get<HabitsController>(HabitsController);
    service = module.get<HabitsService>(HabitsService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should call habitsService.create with body and userId', async () => {
      mockHabitsService.create.mockResolvedValue('created');
      const req = { user: mockUser };
      const body = { name: 'Test Habit' };
      const result = await controller.create(req, body);
      expect(service.create).toHaveBeenCalledWith({
        ...body,
        userId: mockUser.sub,
      });
      expect(result).toBe('created');
    });
  });

  describe('findAll', () => {
    it('should call habitsService.findAllByUser with userId', async () => {
      mockHabitsService.findAllByUser.mockResolvedValue(['habit1', 'habit2']);
      const req = { user: mockUser };
      const result = await controller.findAll(req);
      expect(service.findAllByUser).toHaveBeenCalledWith(mockUser.sub);
      expect(result).toEqual(['habit1', 'habit2']);
    });
  });

  describe('update', () => {
    it('should call habitsService.update with id, userId, and body', async () => {
      mockHabitsService.update.mockResolvedValue('updated');
      const req = { user: mockUser };
      const id = 'habitId';
      const body = { name: 'Updated Habit' };
      const result = await controller.update(req, id, body);
      expect(service.update).toHaveBeenCalledWith(id, mockUser.sub, body);
      expect(result).toBe('updated');
    });
  });

  describe('remove', () => {
    it('should call habitsService.delete with id and userId', async () => {
      mockHabitsService.delete.mockResolvedValue('deleted');
      const req = { user: mockUser };
      const id = 'habitId';
      const result = await controller.remove(req, id);
      expect(service.delete).toHaveBeenCalledWith(id, mockUser.sub);
      expect(result).toBe('deleted');
    });
  });
});
