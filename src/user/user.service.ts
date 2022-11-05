import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { RegisterUserResponse } from '../types/user';

@Injectable()
export class UserService {
  async register(user: RegisterDto): Promise<RegisterUserResponse> {
    const { firstName, lastName, username, email, password } = user;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User();

    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.username = username;
    newUser.email = email;
    newUser.password = hashedPassword;

    await newUser.save();

    return {
      isSuccess: true,
      user: { firstName, lastName, username, email },
    };
  }
}
