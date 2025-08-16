import {notFound} from "next/navigation";
import {SpecArticlePage} from "@/pages/spec-article-page";
import {apiClientService} from "@/shared/lib/apiClient";
import {IPost} from "@/shared/model";
import {CommentsList, IComment} from "@/features/comment";

export async function generateStaticParams() {
    try {
        const article = await apiClientService.get<{ articles: IPost[] }>(`/articles`);

        return article.articles.map((article: IPost) => ({
            slug: article.slug,
        }));

    } catch (error) {
        console.error("Ошибка при получении статей:", error);

        return [];
    }
}

export default async function ArticlePage({
                                              params,
                                          }: {
    params: Promise<{ slug: string }>
}) {
    const {slug} = await params;

    const article = await apiClientService.get<{ article: IPost }>(`/articles/${slug}`);
    const articleComments = await apiClientService.get<{ comments: IComment[] }>(`/articles/${slug}/comments`);

    if (!article.article) {
        notFound();
    }

    return (
        <div className={"space-y-8"}>
            <SpecArticlePage article={article.article}/>
            {!articleComments.comments || articleComments.comments.length <= 0 ?
                (
                    <p>Комментариев нет(...</p>
                ) : (
                    <CommentsList comment={articleComments.comments}/>
                )
            }
        </div>
    );
}