import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { RegisterUserResponse } from '../types/user';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @Post('/register')
  registerUser(@Body() user: RegisterDto): Promise<RegisterUserResponse> {
    return this.userService.register(user);
  }
}
