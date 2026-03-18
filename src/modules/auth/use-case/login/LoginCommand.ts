export interface LoginCommand {
  username: string;
  password: string;
  expiresInMins?: number;
}
