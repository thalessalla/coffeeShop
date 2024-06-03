import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "./queryKeys";

export const useGetCoffes = () => {
  return useQuery({
    queryKey: [QueryKeys.coffes],
    queryFn: async () => {
      const response = await fetch("https://fake-coffee-api.vercel.app/api");
      const data = await response.json();
      return data;
    },
  });
};
