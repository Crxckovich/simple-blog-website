import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Htag } from "@/shared/ui/htag";
import { FollowUserButton } from "@/features/follow-user";
import { IProfile } from "@/shared/model";

export const ProfilesPage = ({ profile }: { profile: IProfile }) => {
  return (
    <div className="space-y-8">
      <div className="space-y-15">
        <div
          className="relative flex items-end justify-center max-w-full h-[30vh] bg-gradient-to-t from-sky-300 from-30% to-sky-500 rounded-xl"
        >
          <Avatar className="ring-12 ring-background top-12 xl:size-30 lg:size-25 md:size-20 size-15">
            <AvatarImage
              alt={profile.username}
              src={profile.image ? profile.image : "/default.webp"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col gap-6 justify-center items-center">
          <div className="flex flex-col gap-3 items-center">
            <Htag tag="h2">
              @
              {profile.username}
            </Htag>
            <p className="max-w-[50vw] text-center text-muted-foreground">{profile.bio}</p>
          </div>
          <FollowUserButton initialFollowing={profile.following} size="lg" username={profile.username} />
        </div>
      </div>
    </div>
  );
};