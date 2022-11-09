import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from 'src/decorators/user-obj.decorator';
import { BasketService } from './basket.service';
import { AddToBasketDto } from './dto/add-to-basket.dto';
import { User } from '../user/user.entity';
import { AddToBasketResponse } from '../types/basket';

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
}
