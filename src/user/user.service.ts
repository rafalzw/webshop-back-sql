import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { DeleteUserResponse, RegisterUserResponse } from '../types/user';
import { UpdateProfileDto } from './dto/UpdateProfileDto';

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

  async update(user: User, profile: UpdateProfileDto) {
    const foundUser = await User.findOne({ where: { id: user.id } });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(profile.password, salt);

    foundUser.username = profile.username;
    foundUser.email = profile.email;
    foundUser.firstName = profile.firstName;
    foundUser.lastName = profile.lastName;
    foundUser.password = hashedPassword;

    await foundUser.save();

    return {
      isSuccess: true,
    };
  }

  async delete(user: User): Promise<DeleteUserResponse> {
    await User.delete(user.id);
    return {
      isSuccess: true,
    };
  }
}
