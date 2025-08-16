"use client"

import React from 'react';
import {useUser} from "@/entities/user/api/getUser";
import {Avatar, AvatarFallback, AvatarImage} from "@/shared/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut,
    DropdownMenuTrigger
} from '@/shared/ui/dropdown-menu';
import {Skeleton} from "@/shared/ui/skeleton";

export const UserButton = () => {
    const {data, isLoading, error} = useUser()

    if (isLoading) return <Skeleton className={"size-10 shrink-0 overflow-hidden rounded-full"}/>;

    if (error) return <div>An error has occurred: {error.message}</div>;

    if (!data) return <div>No articles found.</div>;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage width={10} src={data.image} alt={data.username}/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>{data.username}</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};