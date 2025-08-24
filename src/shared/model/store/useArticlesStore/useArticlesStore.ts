import { create } from "zustand/react";
import { devtools } from "zustand/middleware";

import { articlesStoreSlice } from "./useArticlesStore.slice";
import { IArticlesStoreActions, IArticlesStoreProps } from "./useArticlesStore.props";

export const useArticlesStore = create<IArticlesStoreProps & IArticlesStoreActions, [["zustand/devtools", never]]>(
  devtools(articlesStoreSlice, { name: "TagsStore" }),
);