import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-verification-email')
  @UseGuards(AuthGuard('jwt'))
  async sendVerificationEmail(@Req() req) {
    const userId = req.user.sub;
    return this.authService.sendVerificationEmail(userId);
  }
}
