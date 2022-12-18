export interface IMessage {}

export interface IUserInfo {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  isSetAvatar?: boolean;
  accessToken: string;
  createdAt: string;
  updatedAt: string;
  refreshToken: string;
}
export interface ILogin {
  email: string;
  password: string;
}

export interface IResgister extends ILogin {
  username: string;
}
