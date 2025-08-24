import { StateCreator } from "zustand/vanilla";

import { apiClientService } from "@/shared/lib/apiClient";
import { setAuthToken } from "@/shared/lib/apiClient";
import { IUserStoreActions, IUserStoreProps } from "@/entities/user/model/store/useUserStore.props";
import { IUser } from "@/shared/model";

export const userStoreSlice: StateCreator<IUserStoreProps & IUserStoreActions, [["zustand/devtools", never]]> = (
  set,
) => ({
  user: null,

  setUser: (user) => {
    set({ user });
    setAuthToken(user?.token || null);
    if (user?.token) {
      localStorage.setItem("token", user.token);
    }
  },

  removeUser: () => {
    set({ user: null });
    setAuthToken(null);
    location.reload();
    localStorage.removeItem("token");
  },

  initUserFromToken: async () => {
    const token = localStorage.getItem("token");

    if (token) {
      setAuthToken(token);
      try {
        const response = await apiClientService.get<{ user: IUser }>("/user");

        set({ user: response.user });
      } catch (error) {
        console.error("Failed to fetch user:", error);
        set({ user: null });
        setAuthToken(null);
        localStorage.removeItem("token");
      }
    }
  },
});