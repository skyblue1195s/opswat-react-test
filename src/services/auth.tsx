import { noAuth } from "@helper/config";
import { ILogin, IRegister } from "@interfaces/Login";

function Login(data: ILogin) {
  return noAuth.post("api/login", data);
}

function Register(data: IRegister) {
  return noAuth.post("api/users", data);
}

export const authService = {
  Login,
  Register,
};
