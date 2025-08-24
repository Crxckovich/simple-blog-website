import React from "react";

import { IComment } from "../model/comment.types";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { UserInfo } from "@/entities/user";
import { DeleteCommentButton } from "@/features/comment/ui/DeleteCommentButton";

export const CommentCard = ({ comment, slug }: { comment: IComment, slug: string }) => {
  return (
    <Card className="gap-3">
      <CardHeader className="gap-2.5">
        <CardTitle className="flex justify-between">
          <UserInfo author={comment.author} />
          <DeleteCommentButton
            author={comment.author}
            commentId={comment.id}
            slug={slug}
          />
        </CardTitle>
        <CardDescription>{comment.createdAt}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p>{comment.body}</p>
      </CardContent>
    </Card>
  );
};