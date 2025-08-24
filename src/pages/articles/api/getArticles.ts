import { useQuery } from "@tanstack/react-query";

import { apiClientService } from "@/shared/lib/apiClient";
import { IArticle } from "@/shared/model";

// Все посты
export const fetchArticles = async () => {
  const response = await apiClientService.get<{ articles: IArticle[] }>("/articles");

  return response.articles;
};

export const useArticles = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: () => fetchArticles(),
  });
};

// Посты фолловеров
export const fetchFeedArticles = async () => {
  const response = await apiClientService.get<{ articles: IArticle[] }>("/articles/feed");

  return response.articles;
};

export const useFeedArticles = () => {
  return useQuery({
    queryKey: ["feedArticles"],
    queryFn: () => fetchFeedArticles(),
  });
};