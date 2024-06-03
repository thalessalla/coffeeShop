import { useMutation } from "@tanstack/react-query";
import { LoginBody, LoginResponse, User } from "./models/types";
import axios from "axios";

const api = axios.create({
  baseURL: "https://reqres.in/api",
});

export const useLogin = () =>
  useMutation({
    mutationFn: (data: LoginBody) => api.post<LoginResponse>("/login", data),
  });
