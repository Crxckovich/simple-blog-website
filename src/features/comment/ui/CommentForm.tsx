"use client";

import React, {useState} from 'react';
import {Textarea} from "@/shared/ui/textarea";
import {Label} from "@/shared/ui/label";
import {Button} from "@/shared/ui/button";

export const CommentForm = () => {
    const [value, setValue] = useState<string>("");

    return (
        <form className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="addComment">Написать комментарий</Label>
                <Textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    id="addComment"
                    placeholder="Ваш комментарий..."
                />
            </div>
            <Button
                disabled={value === ""}
                className="bg-sky-500 hover:bg-sky-600"
            >
                Отправить
            </Button>
        </form>
    );
};