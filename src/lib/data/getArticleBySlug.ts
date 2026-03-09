import { prisma } from "@/lib/prisma";
import { allMockArticles, mapDbArticleToNewsArticle } from "./getArticles";
import { NewsArticle } from "@/types/article";

export async function getArticleBySlug(
    slug: string
): Promise<(NewsArticle & { content?: string }) | null> {
    // First check mock data
    const mockArticle = allMockArticles.find((a) => a.slug === slug);
    if (mockArticle) {
        return mockArticle;
    }

    // Then check database
    try {
        const dbArticle = await prisma.article.findUnique({
            where: { slug },
        });

        if (!dbArticle) return null;

        return {
            ...mapDbArticleToNewsArticle(dbArticle),
            content: dbArticle.content,
        };
    } catch {
        return null;
    }
}
