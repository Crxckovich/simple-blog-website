"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { CommentFormData, useSubmitComment } from "../api/postComment";

import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Textarea } from "@/shared/ui/textarea";

export const commentSchema = z.object({
  body: z.string().min(1, { message: "Комментарий обязателен" }),
});

interface CommentFormProps {
    slug: string;
}

export const CommentForm: React.FC<CommentFormProps> = ({ slug }) => {
  const mutation = useSubmitComment(slug);

  const form = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: "",
    },
  });

  const onSubmit = (data: CommentFormData) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="addComment">Написать комментарий</FormLabel>
              <FormControl>
                <Textarea
                  id="addComment"
                  placeholder="Ваш комментарий..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="bg-sky-500 hover:bg-sky-600"
          disabled={mutation.isPending || !form.watch("body")}
          type="submit"
        >
          Отправить
        </Button>
      </form>
    </Form>
  );
};