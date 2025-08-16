import {create} from "zustand/react";
import {IArticlesStoreActions, IArticlesStoreProps} from "@/pages/post/model/useArticlesStore.props";
import {articlesStoreSlice} from "./useArticlesStore.slice";
import {devtools} from "zustand/middleware";

export const useArticlesStore = create<IArticlesStoreProps & IArticlesStoreActions, [["zustand/devtools", never]]>(
    devtools(articlesStoreSlice, {name: "TagsStore"}),
);