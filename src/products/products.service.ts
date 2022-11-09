import { Injectable } from '@nestjs/common';
import { AddProductDto } from './dto/add-product.dto';
import { Product } from './product.entity';
import { AddProductResponse } from '../types/product';

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
}
