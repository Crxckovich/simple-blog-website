import React from 'react';
import {UserButton} from "@/entities/user";
import {Htag} from "@/shared/ui/htag";
import Link from 'next/link';

export const Header = () => {
    return (
        <div className={"w-screen border-b border-border"}>
            <div className="container py-3 flex-row justify-between mx-auto">
                <div className="flex w-full justify-between items-center">
                    <Link href={"/"}>
                        <Htag tag={"h2"} className={"font-bold text-xl w-fit"}>BLOG.io</Htag>
                    </Link>
                    <UserButton/>
                </div>
            </div>
        </div>
    );
};