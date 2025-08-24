"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Htag } from "@/shared/ui/htag";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { apiClientService, setAuthToken } from "@/shared/lib/apiClient";
import { LoginFormData, loginSchema } from "@/features/auth/model/auth.schema";
import { useUserStore } from "@/entities/user";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { IUser } from "@/shared/model";

export const LoginForm = () => {
  const [error, setError] = useState<{ email?: string; password?: string; emailOrPassword?: string } | null>(null);
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const queryClient = useQueryClient();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormData) => {
    setError(null);
    try {
      const response = await apiClientService.post<{ user: IUser }>("/users/login", {
        user: {
          email: values.email,
          password: values.password,
        },
      });

      const { user } = response;

      localStorage.setItem("token", user.token);

      setAuthToken(user.token);
      setUser(user);

      await queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        const errors = error.response?.data?.errors;

        if (errors) {
          setError({
            email: errors.email?.join(", "),
            password: errors.password?.join(", "),
            emailOrPassword: errors["email or password"]?.join(", "),
          });
        } else {
          setError({ emailOrPassword: "Ошибка входа" });
        }
        console.error("Login error:", error.response?.data);
      } else {
        setError({ emailOrPassword: "Неизвестная ошибка" });
        console.error("Unknown error:", error);
      }
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="justify-center">
        <CardTitle>
          <Htag tag="h3">Вход</Htag>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="grid gap-6" onSubmit={form.handleSubmit(onSubmit)}>
            {error && (
              <ul className="error-messages text-red-500 text-sm">
                {error.email && (
                  <li>
                    email
                    {error.email}
                  </li>
                )}
                {error.password && (
                  <li>
                    password
                    {error.password}
                  </li>
                )}
                {error.emailOrPassword && (
                  <li>
                    email or password
                    {error.emailOrPassword}
                  </li>
                )}
              </ul>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Почта</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" type="email" {...field} />
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
                    <Input type="password" {...field} />
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
                {form.formState.isSubmitting ? "Вход..." : "Войти"}
                <LogIn className="ml-2" strokeWidth={2.5} />
              </Button>
              <Link href="/register">
                <Button variant="link">Зарегистрироваться?</Button>
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};