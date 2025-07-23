import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateHabitDto, UpdateHabitDto } from './dto';
import { HabitsService } from './habits.service';

@UseGuards(AuthGuard('jwt'))
@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Request() req, @Body() body: CreateHabitDto) {
    return this.habitsService.create({ ...body, userId: req.user.sub });
  }

  @Get()
  findAll(@Request() req, @Query('limit') limit = 20, @Query('page') page = 1) {
    return this.habitsService.findAllByUser(req.user.sub, {
      limit: Number(limit),
      page: Number(page),
    });
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() body: UpdateHabitDto
  ) {
    return this.habitsService.update(id, req.user.sub, body);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.habitsService.delete(id, req.user.sub);
  }

  /** Marquer comme fait à une date (par défaut aujourd’hui) */
  @Post(':id/mark')
  async markAsDone(
    @Request() req,
    @Param('id') id: string,
    @Body('date') date?: string // ISO
  ) {
    const markDate = date || new Date().toISOString().slice(0, 10); // Format yyyy-mm-dd
    return this.habitsService.markAsDone(id, req.user.sub, markDate);
  }
}
