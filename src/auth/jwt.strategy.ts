import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
// import { Strategy } from 'passport-local';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    console.log({ 'jwtStrategy.validate': payload });
    // const user = await this.authService.validateUser(email, password);
    // // if (!user) {
    // //   throw new UnauthorizedException();
    // // }
    return {
      id: payload.id,
      email: payload.email,
    };
  }
}
