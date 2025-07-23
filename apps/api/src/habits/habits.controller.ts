import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { HabitsService } from './habits.service';

@UseGuards(AuthGuard('jwt'))
@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Post()
  create(@Request() req, @Body() body) {
    return this.habitsService.create({ ...body, userId: req.user.userId });
  }

  @Get()
  findAll(@Request() req) {
    return this.habitsService.findAllByUser(req.user.userId);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() body) {
    return this.habitsService.update(id, req.user.userId, body);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.habitsService.delete(id, req.user.userId);
  }
}
