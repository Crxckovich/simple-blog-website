import { IArticle } from "@/shared/model";

export interface IArticlesStoreProps {
    articles: IArticle[];
    feedArticles: IArticle[];
    filteredArticles: IArticle[];
    filteredFeedArticles: IArticle[];
    tags: string[];
    selectedTags: string[];
    filteredTags: string[];
    selectedTagsArticle: string[];
    searchText: string,
}

export interface IArticlesStoreActions {
    setTags: (tags: string[]) => Promise<void>;
    setArticles: (articles: IArticle[]) => Promise<void>;
    setFeedArticles: (articles: IArticle[]) => Promise<void>;
    filterArticles: (tag: string) => void;
    toggleTagForArticle: (tag: string) => void;
    filterTags: (text: string) => void;
}