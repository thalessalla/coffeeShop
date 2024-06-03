export interface ListCoffes {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface User {
  email: string;
  password: string;
  token: string;
}
