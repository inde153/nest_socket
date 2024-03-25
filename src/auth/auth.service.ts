import { Injectable } from '@nestjs/common';
import { Payload } from './jwt.payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(user: object): object {
    const payload: Payload = { id: user['id'] };
    const accessToken: string = this.createAccessToken(payload)!;

    return { accessToken: accessToken };
    // const refreshToken: string = this.createRefreshToken(payload)!;
  }

  private createAccessToken(payload: Payload): string {
    return this.jwtService.sign(payload);
  }

  private createRefreshToken() {}
}
