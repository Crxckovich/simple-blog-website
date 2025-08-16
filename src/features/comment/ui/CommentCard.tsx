import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shared/ui/card";
import {IComment, UserInfo} from "@/entities/user";

export const CommentCard = ({comment}: { comment: IComment }) => {
    return (
        <div>
            <Card className={"gap-3"}>
                <CardHeader className={"gap-2.5"}>
                    <CardTitle>
                        <UserInfo author={comment.author}/>
                    </CardTitle>
                    <CardDescription>{comment.createdAt}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{comment.body}</p>
                </CardContent>
            </Card>
        </div>
    );
};