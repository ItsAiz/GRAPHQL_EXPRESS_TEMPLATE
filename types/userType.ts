export interface UserBasic {
    id: string;
    email: string;
  }

export interface User extends UserBasic {
    name: string,
    password: string,
};