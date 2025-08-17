import React from 'react';
import {IComment} from "@/features/comment/model/comment.types";
import {CommentCard} from "@/features/comment/ui/CommentCard";
import {Htag} from "@/shared/ui/htag";
import {CommentForm} from "@/features/comment";

export const CommentsList = ({comment}: { comment: IComment[] }) => {
    const commentLength = comment.length;

    return (
        <div className={"space-y-6"}>
            <div className="space-y-4">
                <Htag tag={"h2"}>Комментарии ({commentLength}):</Htag>
                <CommentForm/>
            </div>
            {comment.map((comment) => (
                <CommentCard key={comment.id} comment={comment}/>
            ))}
        </div>
    );
};