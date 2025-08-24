import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiClientService } from "@/shared/lib/apiClient";
import { IArticle } from "@/shared/model";
import { ArticleFormData } from "@/features/edit-article";

export const useSubmitCreatedArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ArticleFormData) => {
      const response = await apiClientService.post<{ article: IArticle }>(
        "/articles",
        { article: data },
      );

      return response.article;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
    onError: (error) => {
      console.error("Ошибка при создании статьи:", error);
    },
  });
};