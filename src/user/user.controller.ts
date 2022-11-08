import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import {
  DeleteUserResponse,
  GetAllUserResponse,
  GetOneUserResponse,
  GetStatsResponse,
  RegisterUserResponse,
  UpdateProfileResponse,
  UserRole,
} from '../types/user';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { UpdateProfileDto } from './dto/UpdateProfileDto';
import { UserObj } from '../decorators/user-obj.decorator';
import { Role } from '../decorators/user-role.decorator';
import { UserRoleGuard } from 'src/guards/user-role.guard';

@Controller('users')
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @Post('/register')
  registerUser(@Body() user: RegisterDto): Promise<RegisterUserResponse> {
    return this.userService.register(user);
  }

  @Get('/find/:id')
  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @Role(UserRole.ADMIN)
  getOneUser(@Param('id') id: string): Promise<GetOneUserResponse> {
    return this.userService.getOne(id);
  }

  @Get('/all/:pageNumber?')
  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @Role(UserRole.ADMIN)
  getAllUser(@Param('pageNumber') pageNumber = 1): Promise<GetAllUserResponse> {
    return this.userService.getAll(pageNumber);
  }

  @Put('/profile')
  @UseGuards(AuthGuard('jwt'))
  updateProfile(
    @UserObj() user: User,
    @Body() profile: UpdateProfileDto,
  ): Promise<UpdateProfileResponse> {
    return this.userService.update(user, profile);
  }

  @Delete('/delete')
  @UseGuards(AuthGuard('jwt'))
  deleteUser(@UserObj() user: User): Promise<DeleteUserResponse> {
    return this.userService.delete(user);
  }

  @Get('/stats/:year?')
  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @Role(UserRole.ADMIN)
  getStats(
    @Param('year') year = new Date().getFullYear(),
  ): Promise<GetStatsResponse> {
    return this.userService.getStats(year);
  }
}
