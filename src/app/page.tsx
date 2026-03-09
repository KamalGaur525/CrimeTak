
import Sidebar from "./components/Sidebar";
import FeaturedNews from "./components/FeaturedNews";
import EntertainmentSection from "./components/EntertainmentSection";
import VideoSection from "./components/VideoSection";
import CategorySection from "./components/CategorySection";
import TrendingTopics from "./components/TrendingTopics"; 
import {
  breakingNews,
  entertainmentNews,
  videoNews,
  politicsNews,
  courtNews,
  investigationNews,
  exclusiveNews,
} from "./data/mockData";
import { Landmark, Scale, Search, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-main">
      {/* Header */}
    

      {/* Main 3-Column Layout */}
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <Sidebar />

          {/* Main Content Feed */}
          <main className="flex-1 min-w-0">
            {/* SECTION 1 — Breaking News */}
            <FeaturedNews
              mainArticle={breakingNews[0]}
              sideArticles={breakingNews.slice(1)}
            />

            {/* SECTION 2 — Entertainment (Horizontal Scroll) */}
            <EntertainmentSection articles={entertainmentNews} />

            {/* SECTION 3 — Videos */}
            <VideoSection articles={videoNews} />

            {/* SECTION 4 — Politics */}
            <CategorySection
              title="Politics"
              articles={politicsNews}
              accentColor="bg-blue-600"
              icon={<Landmark size={20} className="text-blue-600" />}
              viewAllHref="/politics"
            />

            {/* SECTION 5 — Court News */}
            <CategorySection
              title="Court News"
              articles={courtNews}
              accentColor="bg-amber-600"
              icon={<Scale size={20} className="text-amber-600" />}
              viewAllHref="/court"
            />

            {/* SECTION 6 — Investigation */}
            <CategorySection
              title="Investigation"
              articles={investigationNews}
              accentColor="bg-emerald-700"
              icon={<Search size={20} className="text-emerald-700" />}
              viewAllHref="/investigation"
            />

            {/* SECTION 7 — Exclusive Stories */}
            <CategorySection
              title="Exclusive Stories"
              articles={exclusiveNews}
              accentColor="bg-primary"
              icon={<Star size={20} className="text-primary" />}
              viewAllHref="/exclusive"
            />
          </main>

          {/* Right Sidebar */}
          <TrendingTopics />
        </div>
      </div>

     
    </div>
  );
}
