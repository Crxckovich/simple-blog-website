import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiClientService } from "@/shared/lib/apiClient";

export const toggleFollow = async (username: string, isFollowing: boolean): Promise<void> => {
  if (isFollowing) {
    await apiClientService.delete(`/profiles/${username}/follow`);
  } else {
    await apiClientService.post(`/profiles/${username}/follow`);
  }
};

export const useToggleFollow = (username: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isFollowing: boolean) => toggleFollow(username, isFollowing),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userByUsername", username] });
      queryClient.invalidateQueries({ queryKey: ["feedArticles"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};