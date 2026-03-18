import { createEntityAdapter } from "@reduxjs/toolkit";

export interface UserEntity {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export const UserEntityAdapter = createEntityAdapter<UserEntity>();
