import { notFound } from "next/navigation";

import { apiClientService } from "@/shared/lib/apiClient";
import { IArticle, IProfile } from "@/shared/model";
import { ProfilesPage } from "@/pages/profile";

export async function generateStaticParams() {
  try {
    const response = await apiClientService.get<{ articles: IArticle[] }>("/articles");
    const articles = response.articles || [];

    const usernames = Array.from(new Set(articles.map((article) => article.author.username)));

    return usernames.map((username) => ({
      username,
    }));
  } catch (error) {
    console.error("Ошибка при получении статей:", error);

    return [];
  }
}

export default async function ProfilePage({
  params,
}: {
    params: Promise<{ username: string }>
}) {
  const { username } = await params;

  const response = await apiClientService.get<{ profile: IProfile }>(`/profiles/${username}`);

  if (!response.profile) {
    notFound();
  }

  return (
    <ProfilesPage profile={response.profile} />
  );
}