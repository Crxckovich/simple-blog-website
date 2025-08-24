import { StateCreator } from "zustand/vanilla";

import { IArticlesStoreActions, IArticlesStoreProps } from "./useArticlesStore.props";

import { IArticle } from "@/shared/model";

export const articlesStoreSlice: StateCreator<IArticlesStoreProps & IArticlesStoreActions, [["zustand/devtools", never]]> = (
  set,
  get,
) => ({
  articles: [],
  feedArticles: [],

  filteredArticles: [],
  filteredFeedArticles: [],

  filteredTags: [],
  tags: [],
  selectedTags: [],
  selectedTagsArticle: [],
  searchText: "",

  setTags: async (tags: string[]) => {
    try {
      set({ tags, filteredTags: tags });
    } catch (error) {
      console.error("Ошибка при получении тегов:", error);
    }
  },

  setArticles: async (articles: IArticle[]) => {
    try {
      set({ articles, filteredArticles: articles });
    } catch (error) {
      console.error("Ошибка при получении статей:", error);
    }
  },

  setFeedArticles: async (feedArticles: IArticle[]) => {
    try {
      set({ feedArticles, filteredFeedArticles: feedArticles });
    } catch (error) {
      console.error("Ошибка при получении статей подписок:", error);
    }
  },

  filterArticles: (tag: string) => {
    const { articles, feedArticles, selectedTags } = get();

    if (tag === "") {
      set({ filteredArticles: articles, filteredFeedArticles: feedArticles, selectedTags: [] });

      return;
    }

    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    if (newSelectedTags.length === 0) {
      set({ filteredArticles: articles, filteredFeedArticles: feedArticles, selectedTags: [] });

      return;
    }

    const filteredArticles = articles.filter((article) =>
      newSelectedTags.every((tag) => article.tagList.includes(tag)),
    );

    const filteredFeedArticles = feedArticles.filter((article) =>
      newSelectedTags.every((tag) => article.tagList.includes(tag)),
    );

    set({ filteredArticles, filteredFeedArticles, selectedTags: newSelectedTags });
  },

  filterTags: (text: string) => {
    const { tags } = get();
    const filteredTags = tags.filter((tag) => tag.toLowerCase().includes(text.toLowerCase()));

    set({ filteredTags, searchText: text });
  },

  toggleTagForArticle: (tag: string) => {
    const { selectedTagsArticle } = get();
    const newSelectedTagsArticle = selectedTagsArticle.includes(tag)
      ? selectedTagsArticle.filter((t) => t !== tag)
      : [...selectedTagsArticle, tag];

    set({ selectedTagsArticle: newSelectedTagsArticle });
  },
});