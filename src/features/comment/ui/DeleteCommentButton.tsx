"use client";

import React from "react";
import { Trash2 } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { useUserStore } from "@/entities/user";
import { useDeleteComment } from "@/features/comment/api/deleteComment";
import { IProfile } from "@/shared/model";

interface DeleteCommentButtonProps {
    slug: string;
    commentId: number;
    author: IProfile;
}

export const DeleteCommentButton: React.FC<DeleteCommentButtonProps> = ({
  slug,
  commentId,
  author,
}) => {
  const currentUser = useUserStore((state) => state.user);
  const isAuthor = currentUser?.username === author.username;
  const deleteCommentMutation = useDeleteComment(slug, commentId);

  if (!isAuthor) {
    return null;
  }

  const handleDelete = () => {
    deleteCommentMutation.mutate();
  };

  return (
    <Button
      disabled={deleteCommentMutation.isPending}
      size="sm"
      variant="destructive"
      onClick={handleDelete}
    >
      Удалить
      <Trash2 />
    </Button>
  );
};