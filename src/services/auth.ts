import { User } from "./api/models/types";

export const login = (userData: User) => {
  localStorage.setItem("authToken", userData.token);
};

export const verifyToken = () => {
  const token = localStorage.getItem("authToken");
  return token !== null;
};

export const logout = () => {
  const token = localStorage.removeItem("authToken");
  return token == null;
};
