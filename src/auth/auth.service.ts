import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userObj: LoginAuthDto) {
    const { email, password } = userObj;
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.BAD_REQUEST);
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      throw new HttpException('INCORRECT_PASSWORD', HttpStatus.UNAUTHORIZED);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const payload = {
      id: user.id,
      email: user.email,
    };
    const token = await this.jwtService.sign(payload);

    const data = {
      user: payload,
      token,
    };
    return data;
  }

  async register(userObj: RegisterAuthDto) {
    const { password } = userObj;
    const hashedPassword = await hash(password, 10);

    userObj = {
      ...userObj,
      password: hashedPassword,
    };

    // return {
    //   user: registeredUser,
    //   access_token: this.jwtService.sign(userObj),
    // };
    return this.usersService.create(userObj);
  }
}
