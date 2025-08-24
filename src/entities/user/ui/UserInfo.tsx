import React from "react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { IProfile } from "@/shared/model";

export const UserInfo = ({ author }: { author: IProfile }) => {
  return (
    <Link href={`/profiles/${author.username}`}>
      <div className="flex flex-wrap gap-2 items-center w-fit">
        <Avatar>
          <AvatarImage alt={author.username} src={author.image ? author.image : "/default.webp"} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="font-bold">
          @
          {author.username}
        </p>
      </div>
    </Link>
  );
};