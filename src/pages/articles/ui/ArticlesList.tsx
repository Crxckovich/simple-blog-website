"use client";

import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { useArticles } from "../api/getArticles";

import { Skeleton } from "@/shared/ui/skeleton";
import { PostCard } from "@/pages/articles/ui/PostCard";
import { useArticlesStore } from "@/shared/model";

export const ArticlesList = () => {
  const { data, isLoading, isError, error } = useArticles();
  const setArticles = useArticlesStore((state) => state.setArticles);

  const { filteredArticles } = useArticlesStore(
    useShallow((state) => ({
      filteredArticles: state.filteredArticles,
    })),
  );

  useEffect(() => {
    if (data) {
      setArticles(data);
    }
  }, [data, setArticles]);

  if (isLoading) {
    return (
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton className="w-full h-[25vh] rounded-xl" key={index} />
        ))}
      </div>
    );
  }

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

  if (!filteredArticles || filteredArticles.length === 0) {
    return <div>No articles found.</div>;
  }

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
      {filteredArticles.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
};
