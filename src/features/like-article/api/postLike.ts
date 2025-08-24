import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiClientService } from "@/shared/lib/apiClient";

export const toggleFavorite = async (slug: string, isFavorite: boolean): Promise<void> => {
  if (isFavorite) {
    await apiClientService.delete(`/articles/${slug}/favorite`);
  } else {
    await apiClientService.post(`/articles/${slug}/favorite`);
  }
};

export const useToggleFavorite = (slug: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isFavorite: boolean) => toggleFavorite(slug, isFavorite),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["articleBySlug", slug] });
      queryClient.invalidateQueries({ queryKey: ["feedArticles"] });
    },
  });
};