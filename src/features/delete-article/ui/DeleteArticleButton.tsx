"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/shared/ui/button";
import { useUserStore } from "@/entities/user";
import { IProfile } from "@/shared/model";
import { useDeleteArticle } from "@/features/delete-article/api/deleteArticle";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/shared/ui/alert-dialog";
import { cn } from "@/shared/lib/utils";

interface IDeleteArticleButtonProps {
    slug: string;
    author: IProfile;
    showText?: boolean;
    showButton?: boolean;
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export const DeleteArticleButton: React.FC<IDeleteArticleButtonProps> = ({
  slug,
  author,
  showText = false,
  isOpen,
  onOpenChange,
  showButton = true,
}) => {
  const currentUser = useUserStore((state) => state.user);
  const isAuthor = currentUser?.username === author.username;
  const router = useRouter();
  const deleteArticleMutation = useDeleteArticle(slug, {
    onSuccess: () => {
      router.push("/");
    },
  });

  if (!isAuthor) {
    return null;
  }
  const handleDelete = () => {
    deleteArticleMutation.mutate();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      {showButton && (
        <AlertDialogTrigger asChild>
          <Button
            className={cn("w-fit", !showText && "h-full px-3.5")}
            disabled={deleteArticleMutation.isPending}
            size={showText ? "lg" : "icon"}
            variant="destructive"
          >
            {showText && "Удалить статью"}
            <Trash2 />
          </Button>
        </AlertDialogTrigger>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы точно уверены?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие невозможно отменить. Это приведет к безвозвратному удалению вашей статьи с наших
            серверов.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onOpenChange && onOpenChange(false)}>Отмена</AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteArticleMutation.isPending}
            onClick={handleDelete}
          >
            Продолжить
            <Trash2 />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};