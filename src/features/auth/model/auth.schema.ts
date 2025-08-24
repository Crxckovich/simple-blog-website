import { z } from "zod";

import { PASSWORD_REGEX, USER_REGEX } from "@/shared/model";

export const loginSchema = z.object({
  email: z.email("Введите корректный email").min(1, "Email обязателен"),
  password: z.string()
    .min(8, "Пароль должен быть не менее 8 символов")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, "Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву и одну цифру"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  username: z.string()
    .min(3, "Имя пользователя должно быть не менее 3 символов")
    .max(50, "Имя пользователя не должно превышать 50 символов")
    .regex(USER_REGEX, "Имя пользователя может содержать только буквы, цифры, подчёркивания и дефисы"),
  email: z.email("Введите корректный email").min(1, "Email обязателен"),
  password: z.string()
    .min(8, "Пароль должен быть не менее 8 символов")
    .regex(PASSWORD_REGEX, "Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву и одну цифру"),
  confirmPassword: z.string()
    .min(8, "Пароль должен быть не менее 8 символов")
    .regex(PASSWORD_REGEX, "Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву и одну цифру"),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли должны совпадать",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;