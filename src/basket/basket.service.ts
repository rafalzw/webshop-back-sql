import { Inject, Injectable } from '@nestjs/common';
import { AddToBasketDto } from './dto/add-to-basket.dto';
import { User } from '../user/user.entity';
import {
  AddToBasketResponse,
  GetAllBasketsResponse,
  GetUserBasketResponse,
  RemoveProductResponse,
} from 'src/types/basket';
import { ProductsService } from '../products/products.service';
import { Basket } from './basket.entity';
import { ProductInterface } from '../types/product';

@Injectable()
export class BasketService {
  constructor(
    @Inject(ProductsService) private readonly productService: ProductsService,
  ) {}

  async add(product: AddToBasketDto, user: User): Promise<AddToBasketResponse> {
    const { count, productId } = product;

    const shopItem = await this.productService.getOne(productId);

    if (
      typeof productId !== 'string' ||
      typeof count !== 'number' ||
      productId === '' ||
      count < 1 ||
      !shopItem
    ) {
      return {
        isSuccess: false,
      };
    }

    const item = new Basket();
    item.count = count;

    await item.save();

    item.product = shopItem.data;
    item.user = user;

    await item.save();

    return {
      isSuccess: true,
      id: item.id,
    };
  }

  async getUserBasket(user: User): Promise<GetUserBasketResponse> {
    const { id } = user;
    const basket = await Basket.findOneOrFail({
      relations: ['user', 'product'],
      where: { user: { id } },
    });

    return {
      isSuccess: true,
      data: { id: basket.id, count: basket.count, product: basket.product },
    };
  }

  async getAllBaskets(pageNumber: number): Promise<GetAllBasketsResponse> {
    const maxPerPage = 10;
    const currentPage = Number(pageNumber);

    const [data, pagesCount] = await Basket.findAndCount({
      relations: ['user', 'product'],
      skip: maxPerPage * (currentPage - 1),
      take: maxPerPage,
    });

    const totalPages = Math.ceil(pagesCount / maxPerPage);

    return {
      isSuccess: true,
      data,
      totalPages,
    };
  }

  async remove(id: string): Promise<RemoveProductResponse> {
    const foundProduct = await Basket.findOneOrFail({
      relations: ['product'],
      where: { product: { id } },
    });
    await foundProduct.remove();

    return {
      isSuccess: true,
    };
  }
}
