import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';

@Entity()
export class Basket extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  count: number;

  @ManyToOne((type) => Product, (entity) => entity.productsInBasket)
  @JoinColumn()
  product: Product;

  @ManyToOne((type) => User, (entity) => entity.productsInBasket)
  @JoinColumn()
  user: User;
}
