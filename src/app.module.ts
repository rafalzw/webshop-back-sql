import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { BasketModule } from './basket/basket.module';

@Module({
  imports: [DatabaseModule, UserModule, ProductModule, BasketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
