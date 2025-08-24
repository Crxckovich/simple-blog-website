import {Header} from "@/pages/main";

export default async function MainLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header/>
            <div className="container mx-auto py-6 xl:px-0 px-5">
                {children}
            </div>
        </>
    );
}
