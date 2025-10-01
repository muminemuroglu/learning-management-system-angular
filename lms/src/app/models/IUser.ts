// Kullanıcı entity
export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  password: string;
}

// Login response
//export interface ILoginResponse {
// access_token: string;
// token_type: string;
// expires_in: number;
//user: IUser;
//}


//export interface IUser { // Kullanıcı arayüzü
//   id: number;
//   name: string;
//   email: string;
//   role?: string;
// }
// export interface ILoginResponse { // Giriş yanıtı arayüzü
//   accessToken: string;
//   user: IUser;
// }
