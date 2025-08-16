import {StateCreator} from "zustand/vanilla";
import {IArticlesStoreActions, IArticlesStoreProps} from "./useArticlesStore.props";
import {apiClientService} from "@/shared/lib/apiClient";
import {IPost} from "@/shared/model";
import {useArticlesStore} from "@/pages/post";

export const articlesStoreSlice: StateCreator<IArticlesStoreProps & IArticlesStoreActions, [["zustand/devtools", never]]> = (
    set,
    get,
) => ({
    articles: [],
    filteredArticles: [],
    tags: [],
    selectedTags: [],

    setTags: async () => {
        try {
            const response = await apiClientService.get<{ tags: string[] }>('/tags');
            const tags = response.tags;
            set({tags})
        } catch (error) {
            console.error('Ошибка при получении тегов:', error);
        }
    },

    setArticles: async () => {
        try {
            const response = await apiClientService.get<{ articles: IPost[] }>('/articles');
            const articles = response.articles;
            set({articles, filteredArticles: articles});
        } catch (error) {
            console.error('Ошибка при получении статей:', error);
        }
    },

    filterArticles: (tag: string) => {
        const {articles, selectedTags} = get();

        if (tag === '') {
            set({filteredArticles: articles, selectedTags: []});
            return;
        }

        const newSelectedTags = selectedTags.includes(tag)
            ? selectedTags.filter((t) => t !== tag)
            : [...selectedTags, tag];

        if (newSelectedTags.length === 0) {
            set({filteredArticles: articles, selectedTags: []});
            return;
        }

        const filteredArticles = articles.filter((article) =>
            newSelectedTags.every((tag) => article.tagList.includes(tag))
        );

        set({filteredArticles, selectedTags: newSelectedTags});
    },
})

export const setArticles = () => useArticlesStore.getState().setArticles();
export const setTags = () => useArticlesStore.getState().setTags();
export const filterArticles = (tag: string) => useArticlesStore.getState().filterArticles(tag);