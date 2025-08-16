import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {BASE_URL} from "@/shared/api";
import {IUser} from "@/entities/user";

export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await axios.get<{ user: IUser }>(`${BASE_URL}/user`);
            return response.data.user;
        },
    });
};