import { useQuery } from "@tanstack/react-query";

import { apiClientService } from "@/shared/lib/apiClient";

export const useTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const response = await apiClientService.get<{ tags: string[] }>("/tags");

      return response.tags;
    },
  });
};
