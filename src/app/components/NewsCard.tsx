"use client";

import { Clock, User } from "lucide-react";
import { NewsArticle } from "../data/mockData";

interface NewsCardProps {
    article: NewsArticle;
    variant?: "default" | "compact" | "horizontal" | "list";
}

export default function NewsCard({
    article,
    variant = "default",
}: NewsCardProps) {
    if (variant === "list") {
        return (
            <a
                href={`/article/${article.slug}`}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
            >
                <div className="w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-text-dark line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                        {article.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[11px] text-text-light">{article.date}</span>
                    </div>
                </div>
            </a>
        );
    }

    if (variant === "horizontal") {
        return (
            <a
                href={`/article/${article.slug}`}
                className="news-card flex gap-4 bg-white rounded-xl overflow-hidden shadow-card group cursor-pointer"
            >
                <div className="w-40 h-28 flex-shrink-0 overflow-hidden">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="news-card-image w-full h-full object-cover transition-transform duration-500"
                    />
                </div>
                <div className="flex-1 py-3 pr-4 min-w-0">
                    <span
                        className={`category-tag ${article.categoryColor} text-[10px] mb-1.5`}
                    >
                        {article.category}
                    </span>
                    <h3 className="text-headline-sm text-text-dark line-clamp-2 group-hover:text-primary transition-colors mt-1">
                        {article.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-meta text-text-light">
                        <span className="flex items-center gap-1">
                            <User size={11} />
                            {article.author}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock size={11} />
                            {article.readTime}
                        </span>
                    </div>
                </div>
            </a>
        );
    }

    if (variant === "compact") {
        return (
            <a
                href={`/article/${article.slug}`}
                className="news-card bg-white rounded-xl overflow-hidden shadow-card group cursor-pointer"
            >
                <div className="relative h-32 overflow-hidden">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="news-card-image w-full h-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2">
                        <span
                            className={`category-tag ${article.categoryColor} text-[10px] shadow-sm`}
                        >
                            {article.category}
                        </span>
                    </div>
                </div>
                <div className="p-3">
                    <h3 className="text-sm font-semibold text-text-dark line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                        {article.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-[11px] text-text-light">
                        <span>{article.author}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                    </div>
                </div>
            </a>
        );
    }

    // Default variant
    return (
        <a
            href={`/article/${article.slug}`}
            className="news-card bg-white rounded-xl overflow-hidden shadow-card group cursor-pointer block"
        >
            <div className="relative h-52 overflow-hidden">
                <img
                    src={article.image}
                    alt={article.title}
                    className="news-card-image w-full h-full object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 image-gradient" />
                <div className="absolute bottom-3 left-3 right-3">
                    <span
                        className={`category-tag ${article.categoryColor} text-[10px] shadow-md`}
                    >
                        {article.category}
                    </span>
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-headline-sm text-text-dark line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                </h3>
                <p className="text-body-sm text-text-gray line-clamp-2 mt-1.5">
                    {article.excerpt}
                </p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border-light">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                            <User size={12} className="text-primary" />
                        </div>
                        <span className="text-meta text-text-gray font-medium">
                            {article.author}
                        </span>
                    </div>
                    <div className="flex items-center gap-1 text-meta text-text-light">
                        <Clock size={11} />
                        {article.readTime}
                    </div>
                </div>
            </div>
        </a>
    );
}
