"use client";

import { ArrowRight } from "lucide-react";
import { NewsArticle } from "../data/mockData";
import NewsCard from "./NewsCard";

interface CategorySectionProps {
    title: string;
    articles: NewsArticle[];
    accentColor?: string;
    icon?: React.ReactNode;
    viewAllHref?: string;
}

export default function CategorySection({
    title,
    articles,
    accentColor = "bg-primary",
    icon,
    viewAllHref = "#",
}: CategorySectionProps) {
    const mainArticle = articles[0];
    const sideArticles = articles.slice(1);

    return (
        <section className="mb-8">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className={`w-1.5 h-7 ${accentColor} rounded-full`} />
                    {icon}
                    <h2 className="text-headline-lg text-text-dark">{title}</h2>
                </div>
                <a
                    href={viewAllHref}
                    className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors group"
                >
                    View All
                    <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                    />
                </a>
            </div>

            {/* Content Grid: Large article left + list right */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                {/* Main Article */}
                <div className="lg:col-span-3">
                    <a
                        href={`/article/${mainArticle.slug}`}
                        className="news-card bg-white rounded-2xl overflow-hidden shadow-card group cursor-pointer block"
                    >
                        <div className="relative h-56 sm:h-72 overflow-hidden">
                            <img
                                src={mainArticle.image}
                                alt={mainArticle.title}
                                className="news-card-image w-full h-full object-cover transition-transform duration-700"
                            />
                            <div className="absolute inset-0 image-gradient" />
                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                <span
                                    className={`category-tag ${mainArticle.categoryColor} shadow-md`}
                                >
                                    {mainArticle.category}
                                </span>
                                <h3 className="text-headline-md sm:text-headline-lg text-white mt-2 line-clamp-3 drop-shadow-lg">
                                    {mainArticle.title}
                                </h3>
                                <p className="text-sm text-white/75 line-clamp-2 mt-1.5 hidden sm:block max-w-md">
                                    {mainArticle.excerpt}
                                </p>
                                <div className="flex items-center gap-3 mt-2 text-white/60 text-meta">
                                    <span>{mainArticle.author}</span>
                                    <span>•</span>
                                    <span>{mainArticle.date}</span>
                                    <span>•</span>
                                    <span>{mainArticle.readTime}</span>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

                {/* Side Articles */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-card overflow-hidden">
                    <div className="divide-y divide-border-light">
                        {sideArticles.map((article, index) => (
                            <div key={article.id}>
                                <NewsCard article={article} variant="list" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
