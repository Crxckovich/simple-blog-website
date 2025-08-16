import {IProfile} from "./profile.types"

export interface IPost {
    slug: string,
    title: string,
    description: string,
    body: string,
    tagList: string[],
    createdAt: Date,
    updatedAt: Date,
    favorited: boolean
    favoritesCount: number
    author: IProfile
}