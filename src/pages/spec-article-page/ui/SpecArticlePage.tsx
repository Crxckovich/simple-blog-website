import React from 'react';
import {Htag} from "@/shared/ui/htag";
import {Badge} from "@/shared/ui/badge";
import {LikeButton} from "@/features/like-post";
import {IPost} from "@/shared/model";
import {UserInfo} from "@/entities/user";

export const SpecArticlePage = ({article}: { article: IPost }) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <UserInfo author={article.author}/>
                    <Htag tag="h1">{article.title}</Htag>
                </div>
                <p className="text-primary/70">{article.description}</p>
                <div className="flex gap-2">
                    <LikeButton post={article}/>
                    {article.tagList.length > 0 ? (
                        article.tagList.map((tag) => (
                            <Badge key={tag} className={"bg-sky-300/30 text-sky-900"}>
                                {tag}
                            </Badge>
                        ))
                    ) : (
                        <span>Теги отсутствуют</span>
                    )}
                </div>
            </div>
            <p>{article.body}</p>
        </div>
    );
};