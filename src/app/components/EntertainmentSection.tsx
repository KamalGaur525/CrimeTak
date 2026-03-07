"use client";

import { ArrowRight, ChevronLeft, ChevronRight, Film } from "lucide-react";
import { useRef } from "react";
import { NewsArticle } from "../data/mockData";

interface EntertainmentSectionProps {
    articles: NewsArticle[];
}

export default function EntertainmentSection({
    articles,
}: EntertainmentSectionProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 320;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="mb-8">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-7 bg-purple-600 rounded-full" />
                    <Film size={20} className="text-purple-600" />
                    <h2 className="text-headline-lg text-text-dark">Entertainment</h2>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => scroll("left")}
                        className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-text-gray transition-colors"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-text-gray transition-colors"
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={18} />
                    </button>
                    <a
                        href="/entertainment"
                        className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors group ml-2"
                    >
                        View All
                        <ArrowRight
                            size={14}
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </a>
                </div>
            </div>

            {/* Horizontal Scroll Cards */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scroll-container pb-2"
            >
                {articles.map((article) => (
                    <a
                        key={article.id}
                        href={`/article/${article.slug}`}
                        className="news-card flex-shrink-0 w-[280px] bg-white rounded-xl overflow-hidden shadow-card group cursor-pointer"
                    >
                        <div className="relative h-44 overflow-hidden">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="news-card-image w-full h-full object-cover transition-transform duration-500"
                            />
                            <div className="absolute inset-0 image-gradient" />
                            <div className="absolute top-2.5 left-2.5">
                                <span
                                    className={`category-tag ${article.categoryColor} text-[10px] shadow-md`}
                                >
                                    {article.category}
                                </span>
                            </div>
                        </div>
                        <div className="p-3.5">
                            <h3 className="text-sm font-semibold text-text-dark line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                                {article.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-2.5 text-[11px] text-text-light">
                                <span>{article.author}</span>
                                <span>•</span>
                                <span>{article.readTime}</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}
