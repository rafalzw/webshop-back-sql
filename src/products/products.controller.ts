import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AddProductDto } from './dto/add-product.dto';
import {
  AddProductResponse,
  GetAllProductsResponse,
  GetOneProductResponse,
} from '../types/product';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';
import { Role } from '../decorators/user-role.decorator';
import { UserRole } from '../types/user';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(ProductsService) private readonly productService: ProductsService,
  ) {}

  @Post('/')
  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @Role(UserRole.ADMIN)
  addProduct(@Body() product: AddProductDto): Promise<AddProductResponse> {
    return this.productService.addProduct(product);
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @Role(UserRole.ADMIN)
  getOne(@Param('id') id: string): Promise<GetOneProductResponse> {
    return this.productService.getOne(id);
  }

  @Get('/')
  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @Role(UserRole.ADMIN)
  getAll(): Promise<GetAllProductsResponse> {
    return this.productService.getAll();
  }
}
