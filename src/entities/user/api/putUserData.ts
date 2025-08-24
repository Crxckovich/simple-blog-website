import { useMutation } from "@tanstack/react-query";

import { EditProfileFormData } from "../model/editProfile.schema";

import { apiClientService } from "@/shared/lib/apiClient";
import { IUser } from "@/shared/model";
import { useUserStore } from "@/entities/user";

export const putUserData = () => {
  return useMutation({
    mutationFn: async (data: EditProfileFormData) => {
      const userUpdate: {
                email: string;
                username: string;
                bio: string;
                image?: string;
                password?: string;
            } = {
              email: data.email,
              username: data.username,
              bio: data.bio || "",
            };

      if (data.password && data.oldPassword) {
        userUpdate.password = data.password;
      }
      const response = await apiClientService.put<{ user: IUser }>("/user", { user: userUpdate });

      return response.user;
    },
    onSuccess: (updatedUser) => {
      useUserStore.getState().setUser(updatedUser);
    },
    onError: (error) => {
      console.error("Ошибка при обновлении профиля:", error);
    },
  });
};