import { Body, Controller, Inject, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { RegisterUserResponse, UpdateProfileResponse } from '../types/user';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { UpdateProfileDto } from './dto/UpdateProfileDto';
import { UserObj } from '../decorators/user-obj.decorator';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @Post('/register')
  registerUser(@Body() user: RegisterDto): Promise<RegisterUserResponse> {
    return this.userService.register(user);
  }

  @Put('/profile')
  @UseGuards(AuthGuard('jwt'))
  updateProfile(
    @UserObj() user: User,
    @Body() profile: UpdateProfileDto,
  ): Promise<UpdateProfileResponse> {
    return this.userService.update(user, profile);
  }
}
