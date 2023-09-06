import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      email: 'rlara',
      password: '$2b$10$HB4U8vgY0VhQuXU4iBGV9e66Pz1WmJpwcCbysoWLSeJ9T9SJ22MfS',
    },
    {
      id: 2,
      email: 'maria',
      password: '$2b$10$HB4U8vgY0VhQuXU4iBGV9e66Pz1WmJpwcCbysoWLSeJ9T9SJ22MfS',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async create(userObj: RegisterAuthDto): Promise<User | undefined> {
    const newUser: User = {
      id: this.users.length + 1,
      email: userObj.email,
      password: userObj.password,
    };
    this.users.push(newUser);
    return newUser;
  }
}
