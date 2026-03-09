"use client";

import { Clock, User, ArrowRight } from "lucide-react";
import { NewsArticle } from "@/types/article";

interface FeaturedNewsProps {
    mainArticle: NewsArticle;
    sideArticles: NewsArticle[];
}

export default function FeaturedNews({
    mainArticle,
    sideArticles,
}: FeaturedNewsProps) {
    return (
        <section className="mb-8">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-7 bg-primary rounded-full" />
                    <h2 className="text-headline-lg text-text-dark">Breaking News</h2>
                    <span className="flex items-center gap-1.5 ml-2 px-2.5 py-1 bg-red-50 text-primary text-xs font-bold rounded-full">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full pulse-dot" />
                        LIVE
                    </span>
                </div>
                <a
                    href="/breaking"
                    className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors group"
                >
                    View All
                    <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                    />
                </a>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                {/* Main Featured Article */}
                <a
                    href={`/article/${mainArticle.slug}`}
                    className="lg:col-span-3 news-card  rounded-2xl overflow-hidden  group hover:shadow-none cursor-pointer block"
                >
                    <div className="relative h-64 sm:h-80 overflow-hidden">
                        <img
                            src={mainArticle.image}
                            alt={mainArticle.title}
                            className="news-card-image w-full h-full object-cover transition-transform duration-700"
                        />
                        <div className="absolute inset-0 image-gradient" />
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                            <span
                                className={`category-tag ${mainArticle.categoryColor} shadow-md mb-3`}
                            >
                                {mainArticle.category}
                            </span>
                            <h2 className="text-headline-xl text-white mt-2 line-clamp-3 drop-shadow-lg">
                                {mainArticle.title}
                            </h2>
                            <p className="text-sm text-white/80 mt-2 line-clamp-2 max-w-lg">
                                {mainArticle.excerpt}
                            </p>
                            <div className="flex items-center gap-4 mt-3 text-white/70 text-meta">
                                <span className="flex items-center gap-1.5">
                                    <User size={12} />
                                    {mainArticle.author}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock size={12} />
                                    {mainArticle.readTime}
                                </span>
                                <span>{mainArticle.date}</span>
                            </div>
                        </div>
                    </div>
                </a>

                {/* Side Articles Stack */}
                <div className="lg:col-span-2 flex flex-col gap-3">
                    {sideArticles.map((article, index) => (
                        <a
                            key={article.id}
                            href={`/article/${article.slug}`}
                            className="news-card flex gap-3 bg-white rounded-xl p-3 shadow-card group cursor-pointer"
                            style={{
                                animationDelay: `${index * 100}ms`,
                            }}
                        >
                            <div className="w-24 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="news-card-image w-full h-full object-cover transition-transform duration-500"
                                />
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                                <div>
                                    <span
                                        className={`category-tag ${article.categoryColor} text-[10px] mb-1`}
                                    >
                                        {article.category}
                                    </span>
                                    <h3 className="text-sm font-semibold text-text-dark line-clamp-2 group-hover:text-primary transition-colors leading-snug mt-1">
                                        {article.title}
                                    </h3>
                                </div>
                                <div className="flex items-center gap-2 text-[11px] text-text-light mt-1">
                                    <span>{article.author}</span>
                                    <span>•</span>
                                    <span>{article.date}</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
