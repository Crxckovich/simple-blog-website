"use client";

import {Ellipsis, Pencil, Trash2} from "lucide-react";

import {Button} from "@/shared/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {useUserStore} from "@/entities/user";
import {IArticle, IProfile} from "@/shared/model";
import {useState} from "react";
import {DeleteArticleButton} from "@/features/delete-article";
import {EditArticleDialog} from "@/features/edit-article";

interface IArticleOptionsProps {
    article: IArticle
}

export const ArticleOptions: React.FC<IArticleOptionsProps> = ({article}) => {
    const [isOpenedEditDialog, setIsOpenedEditDialog] = useState<boolean>(false);
    const [isOpenedRemoveDialog, setIsOpenedRemoveDialog] = useState<boolean>(false);

    const currentUser = useUserStore((state) => state.user);
    const isAuthor = currentUser?.username === article.author.username;

    if (!isAuthor) {
        return null;
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size={"lg"} variant="outline"><Ellipsis/></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuItem onClick={() => setIsOpenedEditDialog(true)}>
                        Редактировать
                        <Pencil/>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem className={"p-0"} onClick={() => setIsOpenedRemoveDialog(true)}>
                        <Button variant={"destructive"} className={"w-full justify-start cursor-pointer"} size={"sm"}>
                            Удалить
                            <Trash2 className={"text-white"}/>
                        </Button>

                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DeleteArticleButton showButton={false} slug={article.slug} author={article.author}
                                 isOpen={isOpenedRemoveDialog}
                                 onOpenChange={setIsOpenedRemoveDialog}/>
            <EditArticleDialog article={article} isOpen={isOpenedEditDialog} onOpenChange={setIsOpenedEditDialog}/>
        </>
    );
};