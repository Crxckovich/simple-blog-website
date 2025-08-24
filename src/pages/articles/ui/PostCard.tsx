import React from "react";
import Link from "next/link";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { LikeButton } from "@/features/like-article";
import { IArticle } from "@/shared/model";
import { DeleteArticleButton } from "@/features/delete-article";
import { UserMiniProfile } from "@/widgets/user-mini-profile";

export const PostCard = ({ post }: { post: IArticle }) => {
  return (
    <article>
      <Card className="h-full">
        <div className="flex flex-col gap-4">
          <CardHeader className="space-y-3">
            <div className="flex gap-2 items-center w-full justify-between">
              <UserMiniProfile author={post.author} />
              <LikeButton
                initialFavorited={post.favorited}
                initialFavoritesCount={post.favoritesCount}
                slug={post.slug}
              />
            </div>
            <div className="space-y-1.5">
              <CardTitle className="text-lg">{post.title}</CardTitle>
              <CardDescription>{post.description}</CardDescription>
            </div>
          </CardHeader>
        </div>
        <CardFooter className="flex flex-col gap-5">
          <ul className="flex flex-wrap gap-2 w-full">
            {post.tagList.map((tag) => (
              <li key={tag}>
                <Badge
                  className="bg-sky-300/30 text-sky-900 pointer-events-none capitalize"
                >
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>

          <div className="flex gap-1.5 w-full">
            <DeleteArticleButton author={post.author} slug={post.slug} />
            <Link className="w-full" href={`articles/${post.slug}`}>
              <Button className="w-full bg-sky-500 hover:bg-sky-600" size="lg">
                Читать
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </article>
  );
};