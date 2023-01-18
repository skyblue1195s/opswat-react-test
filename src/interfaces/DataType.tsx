export interface IUserDataType {
  key?: string;
  id?: string;
  username?: string;
  email?: string;
  bio?: string;
  image?: string;
}

export interface IUserReducer {
  loading?: boolean;
  users?: IUserDataType[];
  userDetails: IUserDataType;
  pagination: any;
}
