import {IProfile} from "@/shared/model";

export interface IComment {
    id: number,
    createdAt: string,
    updatedAt: Date,
    body: string,
    author: IProfile
}