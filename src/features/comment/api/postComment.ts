import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IComment } from "../model/comment.types";

import { apiClientService } from "@/shared/lib/apiClient";

export interface CommentFormData {
    body: string;
}

export const useSubmitComment = (slug: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CommentFormData) => {
      const response = await apiClientService.post<{ comment: IComment }>(
        `/articles/${slug}/comments`,
        { comment: data },
      );

      return response.comment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commentsBySlug", slug] });
    },
    onError: (error) => {
      console.error("Ошибка при создании комментария:", error);
    },
  });
};