import { z } from "zod";

import { PASSWORD_REGEX, USER_REGEX } from "@/shared/model";

export const editProfileSchema = z.object({
  username: z
    .string()
    .min(3, "Имя пользователя должно быть не менее 3 символов")
    .max(50, "Имя пользователя не должно превышать 50 символов")
    .regex(USER_REGEX, "Имя пользователя может содержать только буквы, цифры, подчёркивания и дефисы"),
  email: z.email("Введите корректный email").min(1, "Email обязателен"),
  bio: z.string().optional(),
  password: z
    .string()
    .optional()
    .refine((val) => !val || (val.length >= 8 && PASSWORD_REGEX.test(val)), {
      message: "Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву и одну цифру",
    }),
  confirmPassword: z.string().optional(),
  oldPassword: z.string().optional(),
}).refine((data) => !data.password || (data.password && data.confirmPassword && data.password === data.confirmPassword), {
  message: "Пароли должны совпадать",
  path: ["confirmPassword"],
}).refine((data) => !data.password || (data.password && data.oldPassword), {
  message: "Введите старый пароль для изменения пароля",
  path: ["oldPassword"],
});

export type EditProfileFormData = z.infer<typeof editProfileSchema>;