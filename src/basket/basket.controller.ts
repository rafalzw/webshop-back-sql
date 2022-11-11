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
  GetUserBasketResponse,
  RemoveProductResponse,
} from '../types/basket';

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
  getUserBasket(@UserObj() user: User): Promise<GetUserBasketResponse> {
    return this.basketService.getUserBasket(user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string): Promise<RemoveProductResponse> {
    return this.basketService.remove(id);
  }
}
