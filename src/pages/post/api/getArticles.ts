import {useQuery} from '@tanstack/react-query';
import {BASE_URL} from "@/shared/api";
import {apiClientService} from "@/shared/lib/apiClient";
import {IPost} from '@/shared/model';

// Все посты
export const useArticles = () => {
    return useQuery({
        queryKey: ['articles'],
        queryFn: async () => {
            const response = await apiClientService.get<{ articles: IPost[] }>(`${BASE_URL}/articles`);
            return response.articles;
        },
    });
};

// Конкретный пост
export const fetchPost = async (slug: string): Promise<IPost> => {
    const response = await apiClientService.get<{ article: IPost }>(`/articles/${slug}`);
    return response.article;
};

export const usePost = (slug: string) => {
    return useQuery<IPost, Error>({
        queryKey: ['post', slug],
        queryFn: () => fetchPost(slug),
    });
};