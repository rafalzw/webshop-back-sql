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

  async getAll(
    pageNumber: number,
    queryNew: boolean,
    queryCat: string,
  ): Promise<GetAllProductsResponse> {
    let foundProducts;
    let pagesCount;

    const maxPerPage = 6;
    const currentPage = Number(pageNumber);

    if (queryNew) {
      [foundProducts, pagesCount] = await Product.findAndCount({
        order: {
          createdAt: 'DESC',
        },
        skip: maxPerPage * (currentPage - 1),
        take: maxPerPage,
      });
    } else if (queryCat) {
      [foundProducts, pagesCount] = await Product.findAndCount({
        where: {
          categories: queryCat,
        },
        skip: maxPerPage * (currentPage - 1),
        take: maxPerPage,
      });
    } else {
      [foundProducts, pagesCount] = await Product.findAndCount({
        skip: maxPerPage * (currentPage - 1),
        take: maxPerPage,
      });
    }
    const totalPages = Math.ceil(pagesCount / maxPerPage);

    return {
      isSuccess: true,
      data: foundProducts,
      totalPages,
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
    await foundProduct.remove();

    return {
      isSuccess: true,
    };
  }
}
