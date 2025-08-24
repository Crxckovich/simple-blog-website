import { useQuery } from "@tanstack/react-query";

import { apiClientService } from "@/shared/lib/apiClient";
import { IProfile } from "@/shared/model";

export const fetchUserByUsername = async (username: string) => {
  const response = await apiClientService.get<{ profile: IProfile }>(`/profiles/${username}`);

  return response.profile;
};

export const getUserByUsername = (username: string) => {
  return useQuery({
    queryKey: ["userByUsername", username],
    queryFn: () => fetchUserByUsername(username),
  });
};