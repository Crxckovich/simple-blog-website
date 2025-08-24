"use client";

import React from "react";

import { useToggleFollow } from "../api/postFollowUser";

import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { getUserByUsername, useUserStore } from "@/entities/user";

interface IFollowUserButtonProps {
    username: string;
    initialFollowing: boolean;
    size?: "sm" | "lg";
}

export const FollowUserButton = ({ username, initialFollowing, size = "sm" }: IFollowUserButtonProps) => {
  const currentUser = useUserStore((state) => state.user);
  const { data: user } = getUserByUsername(username);
  const isAuthor = currentUser?.username === username;
  const { mutate, isPending } = useToggleFollow(username);

  if (isAuthor) {
    return null;
  }

  const isFollowing = user ? user.following : initialFollowing;

  const favHandler = () => {
    if (user) {
      mutate(user.following);
    }
  };

  return (
    <Button
      className={cn(
        size === "sm" ? "w-full" : "w-fit",
        isFollowing ? "bg-muted-foreground hover:bg-zinc-600" : "bg-sky-500 hover:bg-sky-600",
        { "opacity-50": isPending },
      )}
      disabled={isPending}
      size={size}
      onClick={favHandler}
    >
      {isFollowing ? "Отписаться" : "Подписаться"}
    </Button>
  );
};