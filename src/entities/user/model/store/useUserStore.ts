import { create } from "zustand/react";
import { devtools } from "zustand/middleware";

import { userStoreSlice } from "./useUserStore.slice";
import { IUserStoreActions, IUserStoreProps } from "./useUserStore.props";

export const useUserStore = create<IUserStoreProps & IUserStoreActions, [["zustand/devtools", never]]>(
  devtools(userStoreSlice, { name: "UserStore" }),
);