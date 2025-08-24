import { useMutation } from "@tanstack/react-query";

import { ArticleFormData } from "../model/articleSchema";

import { apiClientService } from "@/shared/lib/apiClient";
import { IArticle } from "@/shared/model";

export const putArticleData = (slug: string) => {
  return useMutation({
    mutationFn: async (data: ArticleFormData) => {
      const articleUpdate = {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: data.tagList,
      };

      const response = await apiClientService.put<{
                article: IArticle
            }>(`/articles/${slug}`, { article: articleUpdate });

      return response.article;
    },
    onError: (error) => {
      console.error("Ошибка при обновлении статьи:", error);
    },
  });
};