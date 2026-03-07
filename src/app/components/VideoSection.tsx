"use client";

import { ArrowRight, PlayCircle } from "lucide-react";
import { NewsArticle } from "../data/mockData";
import VideoCard from "./VideoCard";

interface VideoSectionProps {
    articles: NewsArticle[];
}

export default function VideoSection({ articles }: VideoSectionProps) {
    const mainVideo = articles[0];
    const sideVideos = articles.slice(1);

    return (
        <section className="mb-8">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-7 bg-pink-600 rounded-full" />
                    <PlayCircle size={22} className="text-pink-600" />
                    <h2 className="text-headline-lg text-text-dark">Videos</h2>
                </div>
                <a
                    href="/videos"
                    className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors group"
                >
                    All Videos
                    <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                    />
                </a>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                {/* Large Video */}
                <div className="lg:col-span-3">
                    <VideoCard article={mainVideo} variant="large" />
                </div>

                {/* Side Videos List */}
                <div className="lg:col-span-2 flex flex-col gap-3">
                    {sideVideos.map((video) => (
                        <VideoCard key={video.id} article={video} variant="small" />
                    ))}
                </div>
            </div>
        </section>
    );
}
