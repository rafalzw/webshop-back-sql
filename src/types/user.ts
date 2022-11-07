export interface UserInterface {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export type RegisterUserResponse = {
  isSuccess: boolean;
  user: UserInterface;
};

export type GetOneUserResponse = {
  isSuccess: boolean;
  user: UserInterface;
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
