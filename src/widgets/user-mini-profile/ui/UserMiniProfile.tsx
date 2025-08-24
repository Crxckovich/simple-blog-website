import React from "react";
import Link from "next/link";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { UserInfo } from "@/entities/user";
import { Button } from "@/shared/ui/button";
import { IProfile } from "@/shared/model";
import { FollowUserButton } from "@/features/follow-user";

export const UserMiniProfile = ({ author }: { author: IProfile }) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <UserInfo author={author} />
      </TooltipTrigger>
      <TooltipContent className="relative flex flex-col gap-3 p-3.5 max-w-[300px]">
        <Link href={`/profiles/${author.username}`}>
          <div className="flex flex-wrap gap-2 items-center">
            <Avatar>
              <AvatarImage
                alt={author.username}
                src={author.image ? author.image : "/default.webp"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="font-bold text-base">
              @
              {author.username}
            </p>
          </div>
        </Link>
        <p className="text-sm text-wrap">{author.bio}</p>

        <div className="space-y-1 w-full">
          <FollowUserButton initialFollowing={author.following} username={author.username} />

          <Link href={`/profiles/${author.username}`}>
            <Button className="w-full" variant="link">Перейти в профиль</Button>
          </Link>
        </div>

      </TooltipContent>
    </Tooltip>
  );
};