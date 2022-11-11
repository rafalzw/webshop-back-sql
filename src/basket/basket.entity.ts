import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../products/product.entity';
import { User } from '../user/user.entity';
import { ProductInterface } from '../types/product';

@Entity()
export class Basket extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  count: number;

  @ManyToOne((type) => Product, (entity) => entity.productsInBasket)
  @JoinColumn()
  product: ProductInterface;

  @ManyToOne((type) => User, (entity) => entity.productsInBasket)
  @JoinColumn()
  user: User;
}
