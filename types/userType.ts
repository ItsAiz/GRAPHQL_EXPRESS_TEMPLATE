export type UserRole = 'basic' | 'admin';
export interface UserBasic {
    id: string;
    email: string;
  }

export interface User extends UserBasic {
    name: string,
    password: string,
    rol: string,
};

export interface UserResponse {
  success: boolean;
  message: string;
  data: {
    user?: User | null;
    users?: User[] | [];
  } | null;
};