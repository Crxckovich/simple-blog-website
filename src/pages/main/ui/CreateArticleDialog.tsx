"use client";

import React from "react";
import { Send } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ArticleFormData, articleSchema } from "@/features/edit-article";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Badge } from "@/shared/ui/badge";
import { getTagClasses } from "@/shared/lib/getTagClasses";
import { cn } from "@/shared/lib/utils";
import { useSubmitCreatedArticle } from "@/pages/main/api/submitCreatedArticle";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { useArticlesStore } from "@/shared/model";

interface ICreateArticleDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export const CreateArticleDialog: React.FC<ICreateArticleDialogProps> = ({ isOpen, onOpenChange }) => {
  const mutation = useSubmitCreatedArticle();
  const { tags } = useArticlesStore(
    useShallow((state) => ({
      tags: state.tags,
    })),
  );

  const { filteredTags } = useArticlesStore(
    useShallow((state) => ({
      filteredTags: state.filteredTags,
    })),
  );

  const filterTags = useArticlesStore((state) => state.filterTags);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterTags(e.target.value);
  };

  const form = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      description: "",
      body: "",
      tagList: [],
    },
  });

  const onSubmit = (data: ArticleFormData) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="gap-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Создать статью</DialogTitle>
          <DialogDescription>
            Регулярные и хорошие публикации привлекают потенциальных подписчиков 😉.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Заголовок</FormLabel>
                    <FormControl>
                      <Input
                        id="title"
                        placeholder="Крутое название..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Краткое описание</FormLabel>
                    <FormControl>
                      <Textarea
                        className="max-h-[200px]"
                        id="description"
                        placeholder="Краткое описание..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Основной текст</FormLabel>
                  <FormControl>
                    <Textarea
                      className="max-h-[500px]"
                      id="body"
                      placeholder="Тут мог быть ваш отличный текст..."
                      rows={6}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tagList"
              render={({ field }) => (
                <FormItem className="grid gap-4">
                  {field.value.length > 0 && (
                    <div className="space-y-2">
                      <FormLabel>
                        Выбранные теги (
                        {field.value.length}
                        ):
                      </FormLabel>
                      <ul className="flex flex-wrap gap-2">
                        {field.value.map((tag) => (
                          <li key={tag}>
                            <Badge
                              className={cn(
                                "transition-colors cursor-pointer capitalize",
                                getTagClasses(true, false, true),
                              )}
                              onClick={() => {
                                const newTags = field.value.filter(
                                  (t) => t !== tag,
                                );

                                field.onChange(newTags);
                              }}
                            >
                              {tag}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="space-y-2">
                    <FormLabel>
                      Теги (
                      {tags.length}
                      ):
                    </FormLabel>
                    <Input
                      className="h-8 mb-3"
                      id="tag-search"
                      placeholder="Поиск по тегам..."
                      onChange={handleSearchChange}
                    />
                    <ul className="flex flex-wrap gap-2">
                      {filteredTags.map((tag) => (
                        <li key={tag}>
                          <Badge
                            className={cn(
                              "transition-colors cursor-pointer capitalize",
                              getTagClasses(
                                field.value.includes(tag),
                                false,
                                field.value.includes(tag),
                              ),
                            )}
                            onClick={() => {
                              const newTags = field.value.includes(tag)
                                ? field.value.filter((t) => t !== tag)
                                : [...field.value, tag];

                              field.onChange(newTags);
                            }}
                          >
                            {tag}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Отмена
                </Button>
              </DialogClose>
              <Button className="bg-sky-500 hover:bg-sky-600" type="submit">
                Опубликовать
                {" "}
                <Send />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};