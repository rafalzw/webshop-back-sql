import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductInterface } from '../types/product';

@Entity()
export class Product extends BaseEntity implements ProductInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    unique: true,
  })
  title: string;

  @Column()
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

  @Column()
  price: number;
}
