import { useQuery } from "@tanstack/react-query";

import { apiClientService } from "@/shared/lib/apiClient";
import { IArticle } from "@/shared/model";

export const fetchArticleBySlug = async (slug: string): Promise<IArticle> => {
  const response = await apiClientService.get<{ article: IArticle }>(`/articles/${slug}`);

  return response.article;
};

export const useArticleBySlug = (slug: string) => {
  return useQuery<IArticle, Error>({
    queryKey: ["articleBySlug", slug],
    queryFn: () => fetchArticleBySlug(slug),
  });
};