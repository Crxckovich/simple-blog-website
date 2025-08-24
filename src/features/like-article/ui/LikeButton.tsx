"use client";

import React from "react";
import { Heart } from "lucide-react";

import { useToggleFavorite } from "../api/postLike";
import { useArticleBySlug } from "../api/getArticleBySlug";

import { cn } from "@/shared/lib/utils";

interface ILikeButtonProps {
    slug: string;
    initialFavorited: boolean;
    initialFavoritesCount: number;
}

export const LikeButton = ({ slug, initialFavorited, initialFavoritesCount }: ILikeButtonProps) => {
  const { data: article } = useArticleBySlug(slug);
  const { mutate, isPending } = useToggleFavorite(slug);

  const isFavorited = article ? article.favorited : initialFavorited;
  const favoritesCount = article ? article.favoritesCount : initialFavoritesCount;

  const favHandler = () => {
    if (article) {
      mutate(article.favorited);
    }
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      <button
        className="cursor-pointer w-fit"
        disabled={isPending}
        onClick={favHandler}
      >
        <Heart
          className={cn(
            "transition-colors duration-100",
            isFavorited ? "text-rose-500 fill-rose-500" : "text-primary/60",
          )}
        />
      </button>
      <span>{favoritesCount}</span>
    </div>
  );
};