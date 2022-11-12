import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from 'src/decorators/user-obj.decorator';
import { BasketService } from './basket.service';
import { AddToBasketDto } from './dto/add-to-basket.dto';
import { User } from '../user/user.entity';
import {
  AddToBasketResponse,
  GetAllBasketsResponse,
  GetAllForUserResponse,
  RemoveProductResponse,
} from '../types/basket';
import { UserRoleGuard } from '../guards/user-role.guard';
import { Role } from '../decorators/user-role.decorator';
import { UserRole } from '../types/user';

@Controller('basket')
export class BasketController {
  constructor(@Inject(BasketService) private basketService: BasketService) {}

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  addProductToBasket(
    @Body() product: AddToBasketDto,
    @UserObj() user: User,
  ): Promise<AddToBasketResponse> {
    return this.basketService.add(product, user);
  }

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  getUserBasket(@UserObj() user: User): Promise<GetAllForUserResponse> {
    return this.basketService.getAllForUser(user);
  }

  @Get('/all/:pageNumber?')
  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @Role(UserRole.ADMIN)
  getAllForAdmin(
    @Param('pageNumber') pageNumber = 1,
  ): Promise<GetAllBasketsResponse> {
    return this.basketService.getAllForAdmin(pageNumber);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  remove(
    @Param('itemInBasketId') itemInBasketId: string,
    @UserObj() user: User,
  ): Promise<RemoveProductResponse> {
    return this.basketService.remove(itemInBasketId, user);
  }
}
