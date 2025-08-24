import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiClientService } from "@/shared/lib/apiClient";

interface DeleteArticleOptions {
    onSuccess?: () => void;
}

export const useDeleteArticle = (slug: string, options: DeleteArticleOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiClientService.delete(`/articles/${slug}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      options.onSuccess?.();
    },
    onError: (error) => {
      console.error("Ошибка при удалении статьи:", error);
    },
  });
};