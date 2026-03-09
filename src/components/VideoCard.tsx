"use client";

import { Play, Clock } from "lucide-react";
import { NewsArticle } from "@/types/article";

interface VideoCardProps {
    article: NewsArticle;
    variant?: "large" | "small";
}

export default function VideoCard({
    article,
    variant = "large",
}: VideoCardProps) {
    if (variant === "small") {
        return (
            <a
                href={`/video/${article.slug}`}
                className="news-card flex gap-3 bg-white rounded-xl p-2.5 shadow-card group cursor-pointer"
            >
                <div className="relative w-28 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="news-card-image w-full h-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                            <Play size={14} className="text-white ml-0.5" fill="white" />
                        </div>
                    </div>
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 text-white text-[10px] font-medium rounded">
                        {article.readTime?.replace("Video • ", "")}
                    </div>
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h4 className="text-sm font-semibold text-text-dark line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                        {article.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1.5 text-[11px] text-text-light">
                        <span>{article.author}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                    </div>
                </div>
            </a>
        );
    }

    // Large variant
    return (
        <a
            href={`/video/${article.slug}`}
            className="news-card relative bg-white rounded-2xl overflow-hidden shadow-card group cursor-pointer block"
        >
            <div className="relative h-64 sm:h-80 overflow-hidden">
                <img
                    src={article.image}
                    alt={article.title}
                    className="news-card-image w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center shadow-xl group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <Play size={24} className="text-white ml-1" fill="white" />
                    </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 text-white text-xs font-medium rounded-lg backdrop-blur-sm">
                    {article.readTime?.replace("Video • ", "")}
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span
                        className={`category-tag ${article.categoryColor} shadow-md mb-2`}
                    >
                        {article.category}
                    </span>
                    <h3 className="text-headline-md text-white mt-2 line-clamp-2 drop-shadow-lg">
                        {article.title}
                    </h3>
                    <p className="text-sm text-white/70 line-clamp-2 mt-1.5 max-w-lg">
                        {article.excerpt}
                    </p>
                    <div className="flex items-center gap-3 mt-3 text-white/60 text-meta">
                        <span>{article.author}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                    </div>
                </div>
            </div>
        </a>
    );
}
