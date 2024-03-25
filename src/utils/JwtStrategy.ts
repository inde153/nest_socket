import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.cookies['accessToken'];
        return cookie;
      },
      ignoreExpiration: false, //토큰 만료 기간을 무시할지? false는 만료된 토큰 자체를 거부한다.
      algorithms: ['HS256'],
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    return { ...payload };
  }
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.cookies['refreshToken'];
        return cookie;
      },
      ignoreExpiration: false, //토큰 만료 기간을 무시할지? false는 만료된 토큰 자체를 거부한다.
      algorithms: ['HS256'],
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    return { ...payload };
  }
}
