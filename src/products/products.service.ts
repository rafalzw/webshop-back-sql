import { Injectable } from '@nestjs/common';
import { AddProductDto } from './dto/add-product.dto';
import { Product } from './product.entity';
import {
  AddProductResponse,
  DeleteProductResponse,
  GetAllProductsResponse,
  GetOneProductResponse,
  UpdateProductResponse,
} from '../types/product';
import { UpdateProductDto } from './dto/update-product.dto';

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

  async getAll(queryNew, queryCat): Promise<GetAllProductsResponse> {
    let foundProducts;

    if (queryNew) {
      foundProducts = await Product.find({
        order: {
          createdAt: 'DESC',
        },
      });
    } else if (queryCat) {
      foundProducts = await Product.find({
        where: {
          categories: queryCat,
        },
      });
    } else {
      foundProducts = await Product.find();
    }
    return {
      isSuccess: true,
      data: foundProducts,
    };
  }

  async update(
    product: UpdateProductDto,
    id: string,
  ): Promise<UpdateProductResponse> {
    const foundProduct = await Product.findOneOrFail({ where: { id } });

    const { title, desc, img, price, color, size, categories } = product;

    foundProduct.title = title;
    foundProduct.categories = categories;
    foundProduct.desc = desc;
    foundProduct.img = img;
    foundProduct.price = price;
    foundProduct.color = color;
    foundProduct.size = size;

    await foundProduct.save();

    return {
      isSuccess: true,
    };
  }

  async remove(id: string): Promise<DeleteProductResponse> {
    const foundProduct = await Product.findOneOrFail({ where: { id } });
    foundProduct.remove();

    return {
      isSuccess: true,
    };
  }
}
