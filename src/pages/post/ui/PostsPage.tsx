import React from 'react';
import {PostsList} from "@/pages/post/ui/PostsList";
import TagsList from "@/pages/post/ui/TagsList";

export const PostsPage = () => {
    return (
        <div className={"flex flex-col gap-6"}>
            <TagsList/>
            <PostsList/>
        </div>
    );
};