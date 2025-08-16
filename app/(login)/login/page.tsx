import React from 'react';
import {Input} from "@/shared/ui/input";
import {Label} from '@/shared/ui/label';
import {Card, CardAction, CardContent, CardFooter, CardHeader} from "@/shared/ui/card";
import {Button} from "@/shared/ui/button";
import {Htag} from "@/shared/ui/htag";

export default function LoginPage() {
    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <Htag tag={"h3"}>Вход</Htag>
                    <CardAction>
                        <Button variant="link">Sign Up</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" required/>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button size={"lg"} className={"w-full bg-sky-500 hover:bg-sky-600"} type="submit">
                        Вход
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};