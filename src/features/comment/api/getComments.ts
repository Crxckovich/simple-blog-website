import { useQuery } from "@tanstack/react-query";

import { IComment } from "../model/comment.types";

import { apiClientService } from "@/shared/lib/apiClient";

export const fetchCommentsBySlug = async (slug: string) => {
  const response = await apiClientService.get<{ comments: IComment[] }>(`/articles/${slug}/comments`);

  return response.comments;
};

export const getCommentsBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["commentsBySlug", slug],
    queryFn: () => fetchCommentsBySlug(slug),
  });
};
