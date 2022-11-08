import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import {
  DeleteUserResponse,
  GetAllUserResponse,
  GetOneUserResponse,
  GetStatsResponse,
  RegisterUserResponse,
  UserInterface,
} from '../types/user';
import { UpdateProfileDto } from './dto/UpdateProfileDto';
import { databaseProviders } from '../database.providers';

@Injectable()
export class UserService {
  filter(user: User): UserInterface {
    const { password, currentTokenId, ...other } = user;
    return other;
  }

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
      data: { firstName, lastName, username, email },
    };
  }

  async getOne(id: string): Promise<GetOneUserResponse> {
    const foundUser = await User.findOne({ where: { id } });
    return {
      isSuccess: true,
      data: this.filter(foundUser),
    };
  }

  async getAll(pageNumber: number): Promise<GetAllUserResponse> {
    const maxPerPage = 2;
    const currentPage = Number(pageNumber);

    const [data, pagesCount] = await User.findAndCount({
      skip: maxPerPage * (currentPage - 1),
      take: maxPerPage,
    });
    const totalPages = Math.ceil(pagesCount / maxPerPage);

    return {
      isSuccess: true,
      data: data.map((user) => this.filter(user)),
      totalPages,
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

  async getStats(year: number): Promise<GetStatsResponse> {
    const data = await User.query(
      `SELECT
                EXTRACT(month FROM createdAt) AS month,
                COUNT(*) AS users
            FROM user
            WHERE YEAR(createdAt)=${year}
            GROUP BY EXTRACT(month FROM createdAt);`,
    );
    return {
      isSuccess: true,
      data,
    };
  }
}
