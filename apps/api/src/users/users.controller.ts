import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from '@track-my-habits/data';

import { AuthService } from '../auth/auth.service';
import { User } from './schemas/user.schema';
import { UsersService } from './users.services';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(@Request() req, @Body() body: Partial<User>) {
    return this.usersService.update(req.user.id, req.user.sub, body);
  }

  /**
   * @description Retrieves a user by their Auth0 ID (sub).
   * Blocked access if access token not corresponds to the user.
   * @author Killian Brisset
   * @date 24/07/2025
   * @param {string} sub
   * @returns {*}  User
   * @memberof UsersController
   */
  @Get('me')
  async findMe(@Request() req): Promise<User | null> {
    // Get token from authorization header
    const token = req.headers.authorization?.split(' ')[1];

    const userInfo: UserInfo | null = await this.authService.getUserInfo(token);

    if (!userInfo?.sub) {
      throw new Error('Unauthorized access');
    }
    let user = await this.usersService.findBySub(userInfo.sub);

    if (user && userInfo.email_verified !== user.emailVerified) {
      user.emailVerified = userInfo.email_verified;
      await this.usersService.update(user.id, userInfo.sub, {
        emailVerified: userInfo.email_verified || false,
        updatedAt: new Date(),
      });
    }

    if (!user) {
      try {
        user = await this.usersService.create({
          sub: userInfo.sub,
          email: userInfo.email,
          emailVerified: userInfo.email_verified || false,
          firstName: '',
          lastName: '',
          profilePicture: userInfo.picture || '',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } catch (error) {
        console.error('Error creating user:', error);
      }
    }
    return user;
  }
}
