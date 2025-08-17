import React from "react";
import {Htag} from "@/shared/ui/htag";

export default function LoginLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative xl:px-0 px-5 flex flex-col gap-6 justify-center items-center h-screen">
            <Htag tag={"h1"}>BLOG.io</Htag>
            {children}
        </div>
    );
}