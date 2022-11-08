export interface UserInterface {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

export interface UserStatsInterface {
  month: number;
  users: number;
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

export type GetStatsResponse = {
  isSuccess: boolean;
  data: UserStatsInterface[];
};
