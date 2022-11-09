import { ProductInterface } from '../../types/product';

export class AddProductDto implements ProductInterface {
  categories: string;
  color: string;
  desc: string;
  img: string;
  price: number;
  size: string;
  title: string;
}
