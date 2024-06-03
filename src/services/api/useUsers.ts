import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "./queryKeys";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const api = axios.create({
  baseURL: "https://reqres.in/api",
});

export const useGetUsers = () => {
  return useQuery({
    queryKey: [QueryKeys.users],
    queryFn: async () => {
      const response = await api.get("/users");
      const data = response.data;
      console.log(data);
      return data;
    },
  });
};

export const useDeleteUser = () =>
  useMutation({
    mutationFn: (data: any) => api.post("/users", data),
  });
