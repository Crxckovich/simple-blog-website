"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useShallow} from "zustand/react/shallow";
import {CirclePlus, LogIn} from "lucide-react";

import {Htag} from "@/shared/ui/htag";
import {Button} from "@/shared/ui/button";
import {UserButton, useUserStore} from "@/entities/user";
import {CreateArticleDialog} from "@/pages/main";

export const Header = () => {
    const [isOpenedDialog, setIsOpenedDialog] = useState<boolean>(false);
    const {user, initUserFromToken} = useUserStore(
        useShallow((state) => ({
            user: state.user,
            initUserFromToken: state.initUserFromToken,
        })),
    );

    useEffect(() => {
        initUserFromToken();
    }, [initUserFromToken]);

    return (
        <header className={"z-50 border-b border-border sticky top-0 bg-background/80 backdrop-blur-lg"}>
            <div className="container py-3 mx-auto">
                <div className="flex justify-between items-center xl:px-0 px-5">
                    <Link className="flex items-center" href="/">
                        <Htag className="font-bold" tag="h2">
                            BLOG.io
                        </Htag>
                    </Link>

                    <nav aria-label="Main navigation">
                        {user ? (
                            <>
                                <div className="items-center gap-4 md:flex hidden">
                                    <Button
                                        className="text-sky-500 hover:text-sky-600"
                                        variant="ghost"
                                        onClick={() => setIsOpenedDialog(true)}
                                    >
                                        Написать статью
                                        <CirclePlus/>
                                    </Button>
                                    <UserButton user={user}/>
                                </div>
                                <div className="items-center gap-4 md:hidden flex">
                                    <Button
                                        size={"icon"}
                                        className="text-sky-500 hover:text-sky-600"
                                        variant="ghost"
                                        onClick={() => setIsOpenedDialog(true)}
                                    >
                                        <CirclePlus/>
                                    </Button>
                                    <UserButton user={user}/>
                                </div>
                            </>

                        ) : (
                            <div className="flex gap-2">
                                <Link href="/register">
                                    <Button variant="link">Зарегистрироваться</Button>
                                </Link>
                                <Link href="/login">
                                    <Button className="bg-sky-500 hover:bg-sky-600">
                                        Войти
                                        <LogIn className="ml-2" strokeWidth={2.5}/>
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
                <CreateArticleDialog isOpen={isOpenedDialog} onOpenChange={setIsOpenedDialog}/>
            </div>
        </header>
    );
};