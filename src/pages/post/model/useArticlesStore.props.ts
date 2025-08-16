import {IPost} from "@/shared/model";

export interface IArticlesStoreProps {
    articles: IPost[];
    filteredArticles: IPost[];
    tags: string[];
    selectedTags: string[];
}

export interface IArticlesStoreActions {
    setTags: () => Promise<void>;
    setArticles: () => Promise<void>;
    filterArticles: (tag: string) => void;
}