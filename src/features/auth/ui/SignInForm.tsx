import React from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/shared/ui/card";
import {Htag} from "@/shared/ui/htag";
import {Label} from "@/shared/ui/label";
import {Input} from "@/shared/ui/input";
import {Button} from "@/shared/ui/button";
import Link from "next/link";
import {LogIn} from "lucide-react";

export const SignInForm = () => {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader className={"justify-center"}>
                <CardTitle>
                    <Htag tag={"h3"}>Регистрация</Htag>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="nickname">Никнейм</Label>
                            <Input
                                id="nickname"
                                type="text"
                                placeholder='"olegmonster" или "IgorTarantul300_xXx"'
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Почта</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Пароль</Label>
                            <Input id="password" type="password" required/>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button size={"lg"} className={"w-full bg-sky-500 hover:bg-sky-600"} type="submit">
                    Зарегистрироваться
                    <LogIn strokeWidth={2.5}/>
                </Button>
                <Link href={"/login"}>
                    <Button variant="link">Войти?</Button>
                </Link>
            </CardFooter>
        </Card>
    );
};