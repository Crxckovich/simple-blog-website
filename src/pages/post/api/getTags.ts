import {useQuery} from '@tanstack/react-query';
import axios from "axios";
import {BASE_URL} from "@/shared/api";

export const useTags = () => {
    return useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const response = await axios.get<{ tags: string[] }>(`${BASE_URL}/tags`);
            return response.data.tags;
        },
    });
};
