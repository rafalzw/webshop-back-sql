import { forwardRef, Module } from '@nestjs/common';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [forwardRef(() => ProductsModule)],
  controllers: [BasketController],
  providers: [BasketService],
  exports: [BasketService],
})
export class BasketModule {}
