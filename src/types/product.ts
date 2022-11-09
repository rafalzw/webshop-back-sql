export interface ProductInterface {
  id?: string;
  title: string;
  desc: string;
  img: string;
  categories: string;
  size: string;
  color: string;
  price: number;
}

export type AddProductResponse = {
  isSuccess: boolean;
  data: ProductInterface;
};
