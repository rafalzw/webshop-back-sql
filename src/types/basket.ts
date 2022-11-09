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
