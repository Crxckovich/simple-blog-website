"use client";

import React, {useState} from "react";
import {CircleUserRound, LogOut, Settings} from "lucide-react";
import Link from "next/link";

import {Avatar, AvatarFallback, AvatarImage} from "@/shared/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {useUserStore} from "@/entities/user";
import {IUser} from "@/shared/model";
import {EditProfileDialog} from "./EditProfileDialog";

export const UserButton = ({user}: { user: IUser }) => {
    const removeUser = useUserStore((state) => state.removeUser);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                    <Avatar>
                        <AvatarImage
                            alt={user.username}
                            src={user.image ? user.image : "/default.webp"}
                            width={10}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuLabel>@{user.username}</DropdownMenuLabel>
                    <Link href={`/profiles/${user.username}`}>
                        <DropdownMenuItem>
                            <CircleUserRound/>
                            Профиль
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={() => setIsOpen(true)}>
                        <Settings/>
                        Настройки
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={() => removeUser()}>
                        <LogOut/>
                        Выйти
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <EditProfileDialog
                user={user}
                isOpen={isOpen}
                onOpenChange={setIsOpen}
            />
        </>
    );
};