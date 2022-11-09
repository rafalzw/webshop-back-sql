import { Injectable } from '@nestjs/common';
import { AddProductDto } from './dto/add-product.dto';
import { Product } from './product.entity';
import {
  AddProductResponse,
  GetAllProductsResponse,
  GetOneProductResponse,
} from '../types/product';
import { GetOneUserResponse } from '../types/user';
import { User } from '../user/user.entity';
import { GlobalExceptionFilter } from '../filters/global-exception.filter';

@Injectable()
export class ProductsService {
  async addProduct(product: AddProductDto): Promise<AddProductResponse> {
    const { title, desc, img, price, color, size, categories } = product;
    const newProduct = new Product();
    newProduct.title = title;
    newProduct.categories = categories;
    newProduct.desc = desc;
    newProduct.img = img;
    newProduct.price = price;
    newProduct.color = color;
    newProduct.size = size;

    await newProduct.save();

    return { isSuccess: true, data: product };
  }

  async getOne(id: string): Promise<GetOneProductResponse> {
    const foundProduct = await Product.findOneOrFail({ where: { id } });

    return {
      isSuccess: true,
      data: foundProduct,
    };
  }

  async getAll(): Promise<GetAllProductsResponse> {
    const foundProducts = await Product.find();

    return {
      isSuccess: true,
      data: foundProducts,
    };
  }
}
