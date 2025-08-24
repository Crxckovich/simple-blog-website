import React from "react";

import { FeedArticlesList } from "./FeedArticlesList";
import TagsList from "./TagsList";

import { ArticlesList } from "@/pages/articles/ui/ArticlesList";
import { ArticlesNavigation } from "@/features/articles-navigation";

interface IArticlesPageProps {
    type?: "all" | "feed";
}

export const ArticlesPage = ({ type = "all" }: IArticlesPageProps) => {
  return (
    <div className="flex flex-col gap-8">
      <TagsList />
      <div className="space-y-4">
        <ArticlesNavigation />
        {type === "all" ? <ArticlesList /> : <FeedArticlesList />}
      </div>
    </div>
  );
};