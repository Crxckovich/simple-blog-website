import { IUser } from "@/shared/model";

export interface IUserStoreProps {
    user: IPost | null;
}

export interface IUserStoreActions {
    setUser: (user: IUser | null) => void;
    removeUser: () => void;
    initUserFromToken: () => void;
}