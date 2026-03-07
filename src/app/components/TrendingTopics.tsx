"use client";

import { TrendingUp, Play, ExternalLink } from "lucide-react";
import { trendingTopics, videoNews } from "../data/mockData";

export default function TrendingTopics() {
    const popularVideos = videoNews.slice(0, 4);

    return (
        <aside className="hidden xl:block w-[300px] flex-shrink-0 sticky top-[140px] h-[calc(100vh-140px)] overflow-y-auto scroll-container">
            <div className="space-y-5">
                {/* Trending Topics */}
                <div className="bg-white rounded-2xl shadow-card p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp size={18} className="text-primary" />
                        <h3 className="text-headline-sm text-text-dark">Trending Topics</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {trendingTopics.map((topic) => (
                            <a
                                key={topic.id}
                                href={`/topic/${topic.name.toLowerCase().replace(/\s+/g, "-")}`}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-primary hover:text-white text-sm font-medium text-text-dark rounded-full transition-all duration-200 group border border-gray-100 hover:border-primary"
                            >
                                <span className="text-xs">#</span>
                                {topic.name}
                                <span className="text-[10px] text-text-light group-hover:text-white/70 ml-0.5">
                                    {topic.count}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Popular Videos */}
                <div className="bg-white rounded-2xl shadow-card p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Play size={18} className="text-primary" />
                            <h3 className="text-headline-sm text-text-dark">Popular Videos</h3>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {popularVideos.map((video, index) => (
                            <a
                                key={video.id}
                                href={`/video/${video.slug}`}
                                className="flex gap-3 group cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div className="relative w-20 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                    <img
                                        src={video.image}
                                        alt={video.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                        <Play
                                            size={14}
                                            className="text-white"
                                            fill="white"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-xs font-semibold text-text-dark line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                                        {video.title}
                                    </h4>
                                    <span className="text-[10px] text-text-light mt-1 block">
                                        {video.readTime}
                                    </span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Advertisement Placeholder */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-8 text-center">
                    <p className="text-xs font-semibold text-text-light uppercase tracking-wider">
                        Advertisement
                    </p>
                    <p className="text-[10px] text-text-light mt-1">300 × 250</p>
                </div>

                {/* Quick Links */}
                <div className="bg-white rounded-2xl shadow-card p-5">
                    <h3 className="text-headline-sm text-text-dark mb-3">Quick Links</h3>
                    <div className="space-y-2">
                        {[
                            "About Us",
                            "Contact",
                            "Advertise",
                            "Privacy Policy",
                            "Terms of Service",
                        ].map((link) => (
                            <a
                                key={link}
                                href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                                className="flex items-center gap-2 text-sm text-text-gray hover:text-primary transition-colors group"
                            >
                                <ExternalLink
                                    size={12}
                                    className="group-hover:translate-x-0.5 transition-transform"
                                />
                                {link}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Second Ad Placeholder */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-8 text-center">
                    <p className="text-xs font-semibold text-text-light uppercase tracking-wider">
                        Advertisement
                    </p>
                    <p className="text-[10px] text-text-light mt-1">300 × 600</p>
                </div>
            </div>
        </aside>
    );
}
