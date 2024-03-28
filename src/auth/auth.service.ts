import { Injectable } from '@nestjs/common';
import { Payload } from './jwt.payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(user: object): object {
    const payload: Payload = { id: user['id'] };
    const accessToken: string = this.createAccessToken(payload)!;
    const refreshToken: string = this.createRefreshToken(payload)!;

    return { accessToken, refreshToken };
  }

  createAccessToken(payload: Payload): string {
    return this.jwtService.sign(payload);
  }

  private createRefreshToken(payload: Payload): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.JWT_SECRET_REFRESH_EXPIRATION,
    });
  }
}
