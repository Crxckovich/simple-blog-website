"use client"

import React, {useState} from 'react';
import {Heart} from 'lucide-react';
import {cn} from '@/shared/lib/utils';
import {IPost} from "@/shared/model";
import {useToggleFavorite} from '../api/postLike';

export const LikeButton = ({post}: { post: IPost }) => {
    const [favorite, setFavorite] = useState<boolean>(false)
    const {mutate: toggleFavoriteMutation} = useToggleFavorite(post.slug);

    const favHandler = () => {
        setFavorite(!favorite);
        toggleFavoriteMutation(favorite);
    };

    return (
        <div className={"flex flex-wrap gap-1.5"}>
            <button onClick={favHandler} className="cursor-pointer w-fit">
                <Heart
                    className={cn(
                        'transition-colors duration-100',
                        favorite ? 'text-rose-500 fill-rose-500' : 'text-primary/60'
                    )}
                />
            </button>
            <span>{post.favoritesCount}</span>
        </div>

    );
};