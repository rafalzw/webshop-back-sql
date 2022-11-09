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

export type GetOneProductResponse = {
  isSuccess: boolean;
  data: ProductInterface;
};

export type GetAllProductsResponse = {
  isSuccess: boolean;
  data: ProductInterface[];
};

export type UpdateProductResponse = {
  isSuccess: boolean;
};
