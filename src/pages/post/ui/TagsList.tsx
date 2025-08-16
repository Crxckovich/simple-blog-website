"use client"

import React, {useEffect} from 'react';
import {Badge} from "@/shared/ui/badge";
import {useArticlesStore} from "@/pages/post";
import {cn} from "@/shared/lib/utils";
import {filterArticles, setTags} from '../model/useArticlesStore.slice';
import {useShallow} from "zustand/react/shallow";

const getTagClasses = (isSelected: boolean, isAllTag: boolean, hasSelectedTag: boolean) => {
    switch (true) {
        case isSelected:
            return 'bg-sky-500';
        case isAllTag:
            return 'bg-sky-300/30 hover:bg-sky-300/50 text-sky-900';
        case hasSelectedTag:
            return 'bg-primary/10 text-primary hover:bg-sky-300/50 hover:text-sky-900';
        default:
            return 'bg-primary/10 text-primary hover:bg-sky-300/50 hover:text-sky-900';
    }
};

export const TagsList = () => {
    const {tags} = useArticlesStore(
        useShallow((state) => ({
            tags: state.tags
        }))
    );
    const selectedTags = useArticlesStore((state) => state.selectedTags);

    useEffect(() => {
        setTags();
    }, [setTags]);

    if (!tags || tags.length === 0) {
        return <div>No tags found.</div>;
    }

    return (
        <div>
            <ul className="flex flex-wrap gap-3 overflow-hidden w-full">
                <li>
                    <Badge
                        onClick={() => filterArticles("")}
                        className={cn(
                            'text-md rounded-lg transition-colors cursor-pointer uppercase',
                            getTagClasses(selectedTags.length === 0, true, selectedTags.length > 0)
                        )}
                    >
                        All
                    </Badge>
                </li>
                {tags.map((tag) => (
                    <li key={tag}>
                        <Badge
                            onClick={() => filterArticles(tag)}
                            className={cn(
                                'text-md rounded-lg transition-colors cursor-pointer uppercase',
                                getTagClasses(selectedTags.includes(tag), false, selectedTags.includes(tag))
                            )}
                        >
                            {tag}
                        </Badge>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TagsList;