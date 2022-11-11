import { ProductInterface } from './product';

export type AddToBasketResponse =
  | {
      isSuccess: true;
      id: string;
    }
  | {
      isSuccess: false;
    };

export type RemoveProductResponse = {
  isSuccess: boolean;
};

export type GetUserBasketResponse = {
  isSuccess: boolean;
  data: { id: string; count: number; product: ProductInterface };
};
