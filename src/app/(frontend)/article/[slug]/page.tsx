import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/data/getArticleBySlug";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";
import Link from "next/link";

interface ArticlePageProps {
    params: { slug: string };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const article = await getArticleBySlug(params.slug);

    if (!article) {
        notFound();
    }

    // For mock articles that don't have full HTML content, show excerpt
    const htmlContent =
        (article as { content?: string }).content ||
        `<p>${article.excerpt}</p>`;

    return (
        <div className="min-h-screen bg-bg-main">
            <article className="max-w-4xl mx-auto px-4 py-8">
                {/* Back Link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-text-gray hover:text-primary transition-colors mb-6"
                >
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>

                {/* Category Badge */}
                <div className="mb-4">
                    <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${article.categoryColor}`}
                    >
                        {article.category}
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-text-dark leading-tight mb-4">
                    {article.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-text-gray mb-6 pb-6 border-b border-border">
                    <span className="flex items-center gap-1.5">
                        <User size={14} />
                        {article.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {article.date}
                    </span>
                    {article.readTime && (
                        <span className="flex items-center gap-1.5">
                            <Clock size={14} />
                            {article.readTime}
                        </span>
                    )}
                </div>

                {/* Featured Image */}
                <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8 bg-gray-100">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Article Content */}
                <div
                    className="prose prose-lg max-w-none
            prose-headings:text-text-dark prose-headings:font-bold
            prose-p:text-text-gray prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-primary prose-blockquote:text-text-gray
            prose-strong:text-text-dark
            prose-img:rounded-xl
            prose-li:text-text-gray"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />

                {/* Bottom Navigation */}
                <div className="mt-12 pt-6 border-t border-border">
                    <Link
                        href="/admin/articles"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to All Articles
                    </Link>
                </div>
            </article>
        </div>
    );
}
