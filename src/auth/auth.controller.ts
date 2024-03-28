import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req): Promise<void> {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req, @Res() res) {
    const token = this.authService.login(req.user.profile);
    return res
      .cookie('access', `${token['accessToken']}`, {
        httpOnly: true,
      })
      .cookie('refresh', `${token['refreshToken']}`, {
        httpOnly: true,
      })
      .redirect(`${process.env.FRONT_URL}`);
  }

  @Post('refresh')
  @UseGuards(AuthGuard('refresh'))
  async getAccessToken(@Req() req, @Res() res): Promise<boolean> {
    const token = this.authService.createAccessToken({ id: req.user.id });
    return res
      .cookie('access', token, {
        httpOnly: true,
      })
      .json('ok');
  }
}
