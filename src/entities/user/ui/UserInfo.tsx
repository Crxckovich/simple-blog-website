import React from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/shared/ui/avatar";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/shared/ui/tooltip";
import {Button} from "@/shared/ui/button";
import {IProfile} from '@/shared/model';

export const UserInfo = ({author}: { author: IProfile }) => {
    return (
        <Tooltip>
            <TooltipTrigger className="flex flex-wrap gap-2 items-center w-fit">
                <Avatar>
                    <AvatarImage src={author.image} alt={author.username}/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className={"font-bold"}>@{author.username}</p>
            </TooltipTrigger>
            <TooltipContent className="relative flex flex-col gap-3 p-3.5 max-w-[300px]">
                <div className="z-50 flex flex-wrap gap-2 items-center">
                    <Avatar>
                        <AvatarImage src={author.image} alt={author.username}/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className={"font-bold text-base"}>@{author.username}</p>
                </div>
                <p className={"text-sm z-50 text-wrap"}>{author.bio}</p>

                {author.following ? (
                    <Button size={"sm"} className={"z-50 bg-sky-500 hover:bg-sky-600"}>Отписаться</Button>
                ) : (
                    <Button size={"sm"} className={"z-50 bg-sky-500 hover:bg-sky-600"}>Подписаться</Button>
                )}
            </TooltipContent>
        </Tooltip>
    );
};