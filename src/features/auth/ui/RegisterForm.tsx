"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { UserPlus } from "lucide-react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import { RegisterFormData, registerSchema } from "../model/auth.schema";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Htag } from "@/shared/ui/htag";
import { Button } from "@/shared/ui/button";
import { apiClientService, setAuthToken } from "@/shared/lib/apiClient";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { useUserStore } from "@/entities/user";
import { ILoginResponse } from "@/shared/model";

export const RegisterForm = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormData) => {
    setError(null);
    try {
      const { confirmPassword, ...userData } = values;
      const response = await apiClientService.post<ILoginResponse>("/users", {
        user: userData,
      });

      const { user } = response;

      setUser(user);
      setAuthToken(user.token);
      localStorage.setItem("token", user.token);
      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        const errors = error.response?.data?.errors;

        if (errors) {
          const message = Object.entries(errors)
            .map(([key, value]) => {
              let cleanKey = key.replace(/^user\s*\.?\s*/i, "");

              cleanKey = cleanKey.charAt(0).toUpperCase() + cleanKey.slice(1);

              return `${cleanKey} ${Array.isArray(value) ? value.join(", ") : value}`;
            })
            .join("; ");

          setError(message);
        } else {
          setError("Ошибка регистрации");
        }
        console.error("Register error:", error.response?.data);
      } else {
        setError("Неизвестная ошибка");
        console.error("Unknown error:", error);
      }
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="justify-center">
        <CardTitle>
          <Htag tag="h3">Регистрация</Htag>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="grid gap-6" onSubmit={form.handleSubmit(onSubmit)}>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя пользователя</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Почта</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Подтвердите пароль</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2 items-center">
              <Button
                className="w-full bg-sky-500 hover:bg-sky-600"
                disabled={form.formState.isSubmitting}
                size="lg"
                type="submit"
              >
                {form.formState.isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
                <UserPlus className="ml-2" strokeWidth={2.5} />
              </Button>
              <Link href="/login">
                <Button variant="link">Уже есть аккаунт?</Button>
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};