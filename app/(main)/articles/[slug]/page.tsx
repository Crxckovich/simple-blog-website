import { notFound } from "next/navigation";

import { SpecArticlePage } from "@/pages/spec-article";
import { apiClientService } from "@/shared/lib/apiClient";
import { IArticle } from "@/shared/model";
import { CommentsList, IComment } from "@/features/comment";

export async function generateStaticParams() {
  try {
    const article = await apiClientService.get<{ articles: IArticle[] }>("/articles");

    return article.articles.map((article: IArticle) => ({
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
  const { slug } = await params;

  const article = await apiClientService.get<{ article: IArticle }>(`/articles/${slug}`);

  if (!article.article) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <SpecArticlePage article={article.article} />
      <CommentsList slug={slug} />
    </div>
  );
}