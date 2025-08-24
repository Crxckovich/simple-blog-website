import React from "react";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { EditProfileFormData, editProfileSchema } from "../model/editProfile.schema";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { IUser } from "@/shared/model";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { putUserData } from "@/entities/user/api/putUserData";
import { Textarea } from "@/shared/ui/textarea";

interface IEditProfileDialogProps {
    user: IUser;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export const EditProfileDialog: React.FC<IEditProfileDialogProps> = ({
  user,
  isOpen,
  onOpenChange,
}) => {
  const form = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: user.username,
      email: user.email,
      bio: user.bio || "",
      password: "",
      confirmPassword: "",
      oldPassword: "",
    },
  });

  const mutation = putUserData();

  const onSubmit = (data: EditProfileFormData) => {
    mutation.mutate(data, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="mb-3">
          <DialogTitle>Редактирование профиля</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Никнейм</FormLabel>
                      <FormControl>
                        <Input id="username" placeholder="Никнейм" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Биография</FormLabel>
                      <FormControl>
                        <Textarea
                          id="bio"
                          placeholder="Биография..."
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
                          id="email"
                          placeholder="почта@mail.ru..."
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-3">
                <p className="font-semibold text-lg">Смена пароля</p>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Новый пароль</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Новый пароль"
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
                        <FormLabel>Подтвердите новый пароль</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Подтвердите новый пароль"
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
                    name="oldPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Старый пароль</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Введите старый пароль"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Отмена
                </Button>
              </DialogClose>
              <Button
                className="bg-sky-500 hover:bg-sky-600"
                disabled={mutation.isPending}
                type="submit"
              >
                Сохранить
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