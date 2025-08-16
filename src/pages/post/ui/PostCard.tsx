import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/shared/ui/card";
import {Badge} from "@/shared/ui/badge";
import {Button} from "@/shared/ui/button";
import Link from "next/link";
import {LikeButton} from '@/features/like-post';
import {IPost} from "@/shared/model";
import {UserInfo} from "@/entities/user";

export const PostCard = ({post}: { post: IPost }) => {
    return (
        <article>
            <Card className={"h-full"}>
                <div className="flex flex-col gap-4">
                    <CardHeader className="space-y-3">
                        <div className="flex gap-2 items-center w-full justify-between">
                            <UserInfo author={post.author}/>
                            <LikeButton post={post}/>
                        </div>
                        <div className="space-y-1.5">
                            <CardTitle className={"text-lg"}>{post.title}</CardTitle>
                            <CardDescription>{post.description}</CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className={"line-clamp-3"}>
                        {post.body}
                    </CardContent>
                </div>
                <CardFooter className={"flex flex-col gap-5"}>
                    <ul className="flex gap-2 overflow-hidden w-full">
                        {post.tagList.map((tag) => (
                            <li key={tag}>
                                <Badge
                                    className={"bg-sky-300/30 text-sky-900 pointer-events-none capitalize"}>{tag}</Badge>
                            </li>
                        ))}
                    </ul>

                    <Link href={`articles/${post.slug}`} className={"w-full"}>
                        <Button size={"lg"} className={"w-full bg-sky-500 hover:bg-sky-600"}>
                            Читать...
                        </Button>
                    </Link>

                </CardFooter>
            </Card>
        </article>
    )
};