export interface UserInterface {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export type RegisterUserResponse = {
  isSuccess: boolean;
  data: UserInterface;
};

export type GetOneUserResponse = {
  isSuccess: boolean;
  data: UserInterface;
};
export type GetAllUserResponse = {
  isSuccess: boolean;
  data: UserInterface[];
  totalPages: number;
};

export type UpdateProfileResponse = {
  isSuccess: boolean;
};

export type DeleteUserResponse = {
  isSuccess: boolean;
};

export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}
