import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductInterface } from '../types/product';

@Entity()
export class Product extends BaseEntity implements ProductInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    unique: true,
    length: 50,
  })
  title: string;

  @Column({
    length: 1000,
  })
  desc: string;

  @Column()
  img: string;

  @Column()
  categories: string;

  @Column()
  size: string;

  @Column({
    length: 36,
  })
  color: string;

  @Column({
    type: 'float',
    precision: 7,
    scale: 2,
  })
  price: number;
}
