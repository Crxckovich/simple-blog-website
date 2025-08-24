import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(1, { message: "Заголовок обязателен" }),
  description: z.string().min(1, { message: "Описание обязательно" }),
  body: z.string().min(1, { message: "Текст обязателен" }),
  tagList: z.array(z.string()).nonempty({ message: "Необходимо выбрать хотя бы один тег" }),
});

export type ArticleFormData = z.infer<typeof articleSchema>;