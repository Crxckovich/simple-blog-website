"use client";

import React from "react";

import { CommentForm } from "./CommentForm";

import { CommentCard } from "@/features/comment/ui/CommentCard";
import { Htag } from "@/shared/ui/htag";
import { getCommentsBySlug } from "@/features/comment/api/getComments";
import { Skeleton } from "@/shared/ui/skeleton";

export const CommentsList = ({ slug }: { slug: string }) => {
  const { data, isLoading, isError, error } = getCommentsBySlug(slug);

  if (isError) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-red-500">
          Ошибка загрузки:
          {error?.message || "Неизвестная ошибка"}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Htag tag="h2">
          Комментарии (
          {data ? data.length : 0}
          ):
        </Htag>
        <CommentForm slug={slug} />
      </div>

      {isLoading ? (
        Array.from({ length: 6 }, (_, index) => (
          <Skeleton className="w-full h-[13vh] rounded-xl" key={index} />
        ))
      ) : !data || data.length === 0 ? (
        <div>Комментариев нету(</div>
      ) : (
        data.map((comment) => (
          <CommentCard comment={comment} key={comment.id} slug={slug} />
        ))
      )}
    </div>
  );
};
