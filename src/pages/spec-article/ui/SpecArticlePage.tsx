import React from "react";

import { Htag } from "@/shared/ui/htag";
import { Badge } from "@/shared/ui/badge";
import { LikeButton } from "@/features/like-article";
import { IArticle } from "@/shared/model";
import { ArticleOptions } from "@/pages/spec-article/ui/ArticleOptions";
import { UserMiniProfile } from "@/widgets/user-mini-profile";

export const SpecArticlePage = ({ article }: { article: IArticle }) => {

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <UserMiniProfile author={article.author} />
            <ArticleOptions article={article} />
          </div>
          <Htag tag="h1">{article.title}</Htag>
        </div>
        <p className="text-primary/70">{article.description}</p>
        <div className="flex gap-2">
          <LikeButton
            initialFavorited={article.favorited}
            initialFavoritesCount={article.favoritesCount}
            slug={article.slug}
          />
          {article.tagList.length > 0 && (
            article.tagList.map((tag) => (
              <Badge className="bg-sky-300/30 text-sky-900" key={tag}>
                {tag}
              </Badge>
            ))
          )}
        </div>
      </div>
      <p>{article.body}</p>
    </div>
  );
};