import {apiClientService} from "@/shared/lib/apiClient";
import {IPost, IProfile} from "@/shared/model";
import {Avatar, AvatarFallback, AvatarImage} from "@/shared/ui/avatar";
import {notFound} from "next/navigation";
import {Htag} from "@/shared/ui/htag";
import {Button} from "@/shared/ui/button";
import React from "react";

export async function generateStaticParams() {
    try {
        const response = await apiClientService.get<{ articles: IPost[] }>('/articles');
        const articles = response.articles || [];

        const usernames = Array.from(new Set(articles.map((article) => article.author.username)));

        return usernames.map((username) => ({
            username,
        }));
    } catch (error) {
        console.error('Ошибка при получении статей:', error);
        return [];
    }
}

export default async function ProfilePage({
                                              params,
                                          }: {
    params: Promise<{ username: string }>
}) {
    const {username} = await params;

    const response = await apiClientService.get<{ profile: IProfile }>(`/profiles/${username}`);

    if (!response.profile) {
        notFound();
    }

    return (
        <div className={"space-y-8"}>
            <div className="space-y-18">
                <div className={"relative flex items-end justify-center max-w-full h-[30vh] bg-sky-500"}>
                    <Avatar
                        className={"ring-12 ring-background top-12 xl:size-30 lg:size-25 md:size-20 size-15"}>
                        <AvatarImage src={response.profile.image} alt={response.profile.username}/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex flex-col gap-6 justify-center items-center">
                    <div className="flex flex-col gap-3 items-center">
                        <Htag tag={"h2"}>@{response.profile.username}</Htag>
                        <p className={"max-w-[50vw] text-center text-muted-foreground"}>{response.profile.bio}</p>
                    </div>
                    {response.profile.following ? (
                        <Button size={"lg"} className={"w-fit bg-sky-500 hover:bg-sky-600"}>Отписаться</Button>
                    ) : (
                        <Button size={"lg"} className={"w-fit bg-sky-500 hover:bg-sky-600"}>Подписаться</Button>
                    )}
                </div>
            </div>
        </div>
    );
}