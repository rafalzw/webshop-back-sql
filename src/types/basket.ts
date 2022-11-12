import { ProductInterface } from './product';
import { UserInterface } from './user';

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

export type GetAllForUserResponse = {
  isSuccess: boolean;
  data: { id: string; count: number; product: ProductInterface }[];
};

export type GetAllBasketsResponse = {
  isSuccess: boolean;
  data: {
    id: string;
    count: number;
    user: UserInterface;
    product: ProductInterface;
  }[];
  totalPages: number;
};
