import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiClientService } from "@/shared/lib/apiClient";

export const useDeleteComment = (slug: string, commentId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiClientService.delete(`/articles/${slug}/comments/${commentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commentsBySlug", slug] });
    },
    onError: (error) => {
      console.error("Ошибка при удалении комментария:", error);
    },
  });
};