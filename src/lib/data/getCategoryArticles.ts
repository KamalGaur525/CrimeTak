import { prisma } from "@/lib/prisma";
import { allMockArticles, mapDbArticleToNewsArticle } from "./getArticles";
import { NewsArticle } from "@/types/article";

export async function getCategoryArticles(
    category: string
): Promise<NewsArticle[]> {
    const mockFiltered = allMockArticles.filter(
        (a) => a.category.toLowerCase() === category.toLowerCase()
    );

    try {
        const dbArticles = await prisma.article.findMany({
            where: { category },
            orderBy: { createdAt: "desc" },
        });

        const mappedDb = dbArticles.map(mapDbArticleToNewsArticle);
        return [...mockFiltered, ...mappedDb];
    } catch {
        return mockFiltered;
    }
}
