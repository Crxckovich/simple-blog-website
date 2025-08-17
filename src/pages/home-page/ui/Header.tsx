import React from 'react';
import {UserButton} from "@/entities/user";
import {Htag} from "@/shared/ui/htag";
import Link from 'next/link';
import {Button} from "@/shared/ui/button";
import {LogIn} from "lucide-react";

export const Header = () => {
    return (
        <div className={"w-full border-b border-border xl:px-0 px-5"}>
            <div className="container py-3 flex-row justify-between mx-auto">
                <div className="flex w-full justify-between items-center">
                    <Link href={"/"}>
                        <Htag tag={"h2"} className={"font-bold text-xl w-fit"}>BLOG.io</Htag>
                    </Link>
                    {/*<UserButton/>*/}
                    <div className="flex gap-2">
                        <Link href={"/sign-in"}>
                            <Button variant={"link"}>Зарегистрироваться</Button>
                        </Link>
                        <Link href={"/login"}>
                            <Button className={"w-full bg-sky-500 hover:bg-sky-600"}>
                                Войти
                                <LogIn strokeWidth={2.5}/>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};