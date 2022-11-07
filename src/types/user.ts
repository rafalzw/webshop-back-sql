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

export type UpdateProfileResponse = {
  isSuccess: boolean;
};

export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}
