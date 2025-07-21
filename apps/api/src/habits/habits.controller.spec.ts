import { HabitsController } from './habits.controller';
import { HabitsService } from './habits.service';

describe('HabitsController', () => {
  let controller: HabitsController;
  let habitsService: HabitsService;

  const mockUser = { user: { userId: 'user123' } };

  beforeEach(() => {
    habitsService = {
      create: jest.fn(),
      findAllByUser: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;
    controller = new HabitsController(habitsService);
  });

  describe('create', () => {
    it('should call habitsService.create with body and userId', async () => {
      const body = { name: 'Test Habit' };
      (habitsService.create as jest.Mock).mockResolvedValue('created');
      const result = await controller.create(mockUser, body);
      expect(habitsService.create).toHaveBeenCalledWith({
        ...body,
        userId: 'user123',
      });
      expect(result).toBe('created');
    });
  });

  describe('findAll', () => {
    it('should call habitsService.findAllByUser with userId', async () => {
      (habitsService.findAllByUser as jest.Mock).mockResolvedValue(['habit1']);
      const result = await controller.findAll(mockUser);
      expect(habitsService.findAllByUser).toHaveBeenCalledWith('user123');
      expect(result).toEqual(['habit1']);
    });
  });

  describe('update', () => {
    it('should call habitsService.update with id, userId, and body', async () => {
      const id = 'habitId';
      const body = { name: 'Updated Habit' };
      (habitsService.update as jest.Mock).mockResolvedValue('updated');
      const result = await controller.update(mockUser, id, body);
      expect(habitsService.update).toHaveBeenCalledWith(id, 'user123', body);
      expect(result).toBe('updated');
    });
  });

  describe('remove', () => {
    it('should call habitsService.delete with id and userId', async () => {
      const id = 'habitId';
      (habitsService.delete as jest.Mock).mockResolvedValue('deleted');
      const result = await controller.remove(mockUser, id);
      expect(habitsService.delete).toHaveBeenCalledWith(id, 'user123');
      expect(result).toBe('deleted');
    });
  });
});
