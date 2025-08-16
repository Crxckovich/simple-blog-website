import {apiClientService} from "@/shared/lib/apiClient";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const toggleFavorite = async (slug: string, isFavorite: boolean): Promise<void> => {
    if (isFavorite) {
        return apiClientService.delete(`/articles/${slug}/favorite`);
    }
    return apiClientService.post(`/articles/${slug}/favorite`);
};

export const useToggleFavorite = (slug: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (isFavorite: boolean) => toggleFavorite(slug, isFavorite),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['post', slug]});
        },
    });
};