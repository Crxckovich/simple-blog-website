"use client";

import React, { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { useTags } from "../api/getTags";

import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/lib/utils";
import { Htag } from "@/shared/ui/htag";
import { getTagClasses } from "@/shared/lib/getTagClasses";
import { Skeleton } from "@/shared/ui/skeleton";
import { useArticlesStore } from "@/shared/model";

export const TagsList = () => {
  const { data, isLoading, isError, error } = useTags();
  const setTags = useArticlesStore((state) => state.setTags);
  const filterArticles = useArticlesStore((state) => state.filterArticles);
  const selectedTags = useArticlesStore((state) => state.selectedTags);
  const { tags } = useArticlesStore(
    useShallow((state) => ({
      tags: state.tags,
    })),
  );

  useEffect(() => {
    if (data) {
      setTags(data);
    }
  }, [data, setTags]);

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Htag tag="h3">
          Теги (
          {tags.length}
          ):
        </Htag>
        <div className="flex flex-wrap gap-3 w-full">
          {Array.from({ length: 12 }, (_, index) => (
            <Skeleton className="h-[30px] w-[80px]" key={index} />
          ))}
        </div>
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

  if (!tags || tags.length === 0) {
    return <div>Тегов нет.</div>;
  }

  return (
    <div className="space-y-3">
      <Htag tag="h3">
        Теги (
        {tags.length}
        ):
      </Htag>
      <ul className="flex flex-wrap gap-3 w-full">
        <li>
          <Badge
            className={cn(
              "text-md rounded-lg transition-colors cursor-pointer uppercase",
              getTagClasses(selectedTags.length === 0, true, selectedTags.length > 0),
            )}
            onClick={() => filterArticles("")}
          >
            All
          </Badge>
        </li>
        {tags.map((tag) => (
          <li key={tag}>
            <Badge
              className={cn(
                "text-md rounded-lg transition-colors cursor-pointer uppercase",
                getTagClasses(selectedTags.includes(tag), false, selectedTags.includes(tag)),
              )}
              onClick={() => filterArticles(tag)}
            >
              {tag}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagsList;