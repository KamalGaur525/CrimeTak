import { prisma } from "@/lib/prisma";
import {
    breakingNews,
    entertainmentNews,
    videoNews,
    politicsNews,
    courtNews,
    investigationNews,
    exclusiveNews,
} from "@/data/mockData";
import { NewsArticle } from "@/types/article";

const allMockArticles: NewsArticle[] = [
    ...breakingNews,
    ...entertainmentNews,
    ...videoNews,
    ...politicsNews,
    ...courtNews,
    ...investigationNews,
    ...exclusiveNews,
];

function mapDbArticleToNewsArticle(
    dbArticle: {
        id: string;
        title: string;
        slug: string;
        content: string;
        image: string;
        author: string;
        category: string;
        createdAt: Date;
    }
): NewsArticle {
    return {
        id: dbArticle.id.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0),
        title: dbArticle.title,
        excerpt: dbArticle.content.replace(/<[^>]*>/g, "").substring(0, 200) + "...",
        image: dbArticle.image,
        author: dbArticle.author,
        date: dbArticle.createdAt.toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }),
        category: dbArticle.category,
        categoryColor: getCategoryColor(dbArticle.category),
        slug: dbArticle.slug,
        readTime: estimateReadTime(dbArticle.content),
    };
}

function getCategoryColor(category: string): string {
    const colorMap: Record<string, string> = {
        "Breaking News": "bg-red-600 text-white",
        Politics: "bg-blue-600 text-white",
        Crime: "bg-gray-800 text-white",
        Entertainment: "bg-purple-600 text-white",
        "Court News": "bg-amber-600 text-white",
        Investigation: "bg-emerald-700 text-white",
        Exclusive: "bg-primary text-white",
        Videos: "bg-pink-600 text-white",
    };
    return colorMap[category] || "bg-gray-600 text-white";
}

function estimateReadTime(htmlContent: string): string {
    const text = htmlContent.replace(/<[^>]*>/g, "");
    const words = text.split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
}

export async function getArticles(): Promise<NewsArticle[]> {
    try {
        const dbArticles = await prisma.article.findMany({
            orderBy: { createdAt: "desc" },
        });

        const mappedDbArticles = dbArticles.map(mapDbArticleToNewsArticle);

        return [...allMockArticles, ...mappedDbArticles];
    } catch {
        return allMockArticles;
    }
}

export async function getBreakingNews(): Promise<NewsArticle[]> {
    try {
        const dbArticles = await prisma.article.findMany({
            where: { category: "Breaking News" },
            orderBy: { createdAt: "desc" },
        });
        const mapped = dbArticles.map(mapDbArticleToNewsArticle);
        return [...breakingNews, ...mapped];
    } catch {
        return breakingNews;
    }
}

export { allMockArticles, mapDbArticleToNewsArticle };
