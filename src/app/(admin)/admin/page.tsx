"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  PenSquare,
  TrendingUp,
  Clock,
  ArrowUpRight,
} from "lucide-react";

interface DashboardStats {
  totalArticles: number;
  recentArticles: {
    title: string;
    slug: string;
    category: string;
    createdAt: string;
  }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalArticles: 0,
    recentArticles: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/articles");
        if (res.ok) {
          const articles = await res.json();
          setStats({
            totalArticles: articles.length,
            recentArticles: articles.slice(0, 5),
          });
        }
      } catch {}
      finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Total DB Articles",
      value: loading ? "—" : stats.totalArticles.toString(),
      icon: FileText,
      color: "bg-red-100 text-red-600",
    },
    {
      label: "Mock Articles",
      value: "28",
      icon: TrendingUp,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Categories",
      value: "8",
      icon: Clock,
      color: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen p-6">

      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A]">
          Dashboard
        </h1>

        <p className="text-[#64748B] mt-1">
          Welcome to the CrimeTak Admin Panel
        </p>
      </div>


      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {statCards.map((card) => (

          <div
            key={card.label}
            className="bg-white border border-[#E2E8F0] rounded-xl p-6 hover:border-red-300 transition"
          >

            <div className="flex items-start justify-between">

              <div>

                <p className="text-[#64748B] text-sm">
                  {card.label}
                </p>

                <p className="text-4xl font-bold text-[#0F172A] mt-2">
                  {card.value}
                </p>

              </div>

              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.color}`}
              >
                <card.icon size={22} />
              </div>

            </div>

          </div>

        ))}

      </div>


      {/* Grid */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


        {/* Quick Actions */}

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">

          <h2 className="text-lg font-semibold text-[#0F172A] mb-4">
            Quick Actions
          </h2>

          <div className="space-y-3">

            <Link
              href="/admin/create"
              className="flex items-center justify-between p-4 rounded-lg border border-[#E2E8F0] hover:border-red-300 hover:bg-red-50 transition group"
            >

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <PenSquare size={18} className="text-red-600" />
                </div>

                <div>
                  <p className="text-[#0F172A] text-sm font-medium">
                    Create New Article
                  </p>

                  <p className="text-[#64748B] text-xs">
                    Write and publish a new story
                  </p>
                </div>

              </div>

              <ArrowUpRight
                size={18}
                className="text-[#94A3B8] group-hover:text-red-500 transition"
              />

            </Link>


            <Link
              href="/admin/articles"
              className="flex items-center justify-between p-4 rounded-lg border border-[#E2E8F0] hover:border-red-300 hover:bg-red-50 transition group"
            >

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FileText size={18} className="text-blue-600" />
                </div>

                <div>
                  <p className="text-[#0F172A] text-sm font-medium">
                    Manage Articles
                  </p>

                  <p className="text-[#64748B] text-xs">
                    View and edit published articles
                  </p>
                </div>

              </div>

              <ArrowUpRight
                size={18}
                className="text-[#94A3B8] group-hover:text-red-500 transition"
              />

            </Link>

          </div>

        </div>



        {/* Recent Articles */}

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">

          <h2 className="text-lg font-semibold text-[#0F172A] mb-4">
            Recent DB Articles
          </h2>

          {loading ? (

            <div className="space-y-3">
              {[1,2,3].map((i)=>(
                <div
                  key={i}
                  className="h-14 bg-gray-100 rounded-lg animate-pulse"
                />
              ))}
            </div>

          ) : stats.recentArticles.length === 0 ? (

            <div className="text-center py-8">

              <FileText size={40} className="text-gray-300 mx-auto mb-3" />

              <p className="text-[#64748B] text-sm">
                No articles published yet
              </p>

              <Link
                href="/admin/create"
                className="text-red-500 text-sm font-medium hover:text-red-600 mt-2 inline-block"
              >
                Create your first article →
              </Link>

            </div>

          ) : (

            <div className="space-y-2">

              {stats.recentArticles.map((article) => (

                <Link
                  key={article.slug}
                  href={`/article/${article.slug}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition group"
                >

                  <div className="min-w-0 flex-1">

                    <p className="text-[#0F172A] text-sm font-medium truncate group-hover:text-red-500 transition">
                      {article.title}
                    </p>

                    <p className="text-[#64748B] text-xs mt-0.5">
                      {article.category} •{" "}
                      {new Date(article.createdAt).toLocaleDateString()}
                    </p>

                  </div>

                  <ArrowUpRight
                    size={14}
                    className="text-[#94A3B8] group-hover:text-red-500 ml-2"
                  />

                </Link>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}