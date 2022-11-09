import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AddProductDto } from './dto/add-product.dto';
import {
  AddProductResponse,
  GetAllProductsResponse,
  GetOneProductResponse,
  UpdateProductResponse,
} from '../types/product';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';
import { Role } from '../decorators/user-role.decorator';
import { UserRole } from '../types/user';
import { UpdateProductDto } from './dto/update-product.dto';

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
  getOne(@Param('id') id: string): Promise<GetOneProductResponse> {
    return this.productService.getOne(id);
  }

  @Get('/')
  getAll(
    @Query('new') queryNew: boolean,
    @Query('category') queryCat: string,
  ): Promise<GetAllProductsResponse> {
    return this.productService.getAll(queryNew, queryCat);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @Role(UserRole.ADMIN)
  update(
    @Body() product: UpdateProductDto,
    @Param('id') id: string,
  ): Promise<UpdateProductResponse> {
    return this.productService.update(product, id);
  }
}
