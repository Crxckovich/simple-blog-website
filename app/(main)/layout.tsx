import {Header} from "@/pages/home-page/ui/Header";

export default async function MainLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header/>
            <div className="container mx-auto py-6">
                {children}
            </div>
        </>
    );
}
