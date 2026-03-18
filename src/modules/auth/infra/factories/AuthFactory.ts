import { UserEntity } from "../../models/authEntity";

export default class AuthFactory {
  static buildUserResponseFromApi(data: any): UserEntity {
    return {
      id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      image: data.image,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  }
}
