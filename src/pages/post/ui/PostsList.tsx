"use client"

import React, {useEffect} from 'react';
import {PostCard} from './PostCard';
import {useArticlesStore} from "@/pages/post";
import {setArticles} from '../model/useArticlesStore.slice';
import {useShallow} from "zustand/react/shallow";
import {Htag} from "@/shared/ui/htag";

export const PostsList = () => {
    const {filteredArticles} = useArticlesStore(
        useShallow((state) => ({
            filteredArticles: state.filteredArticles
        }))
    );

    useEffect(() => {
        setArticles()
    }, [setArticles])

    if (!filteredArticles || filteredArticles.length === 0) {
        return <div>No articles found.</div>;
    }

    return (
        <div className={"grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6"}>
            {filteredArticles.map((post) => (
                <PostCard key={post.slug} post={post}/>
            ))}
        </div>
    );
};