import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req): Promise<void> {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req, @Res() res) {
    return res.redirect(process.env.FRONT_URL);
  }
}
