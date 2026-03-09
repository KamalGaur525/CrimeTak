"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  ExternalLink,
  Calendar,
  User,
  Tag,
  Loader2,
  PenSquare,
} from "lucide-react";

interface Article {
  id: string;
  title: string;
  slug: string;
  image: string;
  author: string;
  category: string;
  createdAt: string;
}

export default function ArticlesListPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("/api/articles");
        if (res.ok) {
          setArticles(await res.json());
        }
      } catch {}
      finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  return (
    <div>
      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold text-[#0F172A]">
            All Articles
          </h1>

          <p className="text-[#64748B] mt-1">
            Manage articles published from the CMS
          </p>
        </div>

        <Link
          href="/admin/create"
          className="px-5 py-2.5 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition flex items-center gap-2 text-sm shadow-sm"
        >
          <PenSquare size={16} />
          New Article
        </Link>

      </div>


      {/* Loading */}

      {loading ? (

        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="text-gray-400 animate-spin" />
        </div>

      ) : articles.length === 0 ? (

        <div className="text-center py-20 bg-white border border-[#E2E8F0] rounded-xl">

          <FileText size={48} className="text-gray-300 mx-auto mb-4" />

          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            No articles yet
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            Articles you publish from the CMS will appear here
          </p>

          <Link
            href="/admin/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition text-sm"
          >
            <PenSquare size={16} />
            Create your first article
          </Link>

        </div>

      ) : (

        <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">

          {/* Table Header */}

          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#E2E8F0] text-xs font-semibold text-[#64748B] uppercase tracking-wider">

            <div className="col-span-5">Article</div>
            <div className="col-span-2">Author</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-1">Link</div>

          </div>


          {/* Rows */}

          {articles.map((article) => (

            <div
              key={article.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 hover:bg-red-50 transition items-center"
            >

              {/* Title */}

              <div className="col-span-5 flex items-center gap-3 min-w-0">

                <div className="w-12 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">

                  <img
                    src={article.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />

                </div>

                <p className="text-[#0F172A] text-sm font-medium truncate">
                  {article.title}
                </p>

              </div>


              {/* Author */}

              <div className="col-span-2 flex items-center gap-1.5 text-sm text-[#64748B]">

                <User size={13} className="text-gray-400 flex-shrink-0" />

                <span className="truncate">
                  {article.author}
                </span>

              </div>


              {/* Category */}

              <div className="col-span-2 flex items-center gap-1.5">

                <Tag size={13} className="text-gray-400 flex-shrink-0" />

                <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2.5 py-1 rounded-full truncate">
                  {article.category}
                </span>

              </div>


              {/* Date */}

              <div className="col-span-2 flex items-center gap-1.5 text-sm text-[#64748B]">

                <Calendar size={13} className="flex-shrink-0" />

                <span className="truncate">
                  {new Date(article.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>

              </div>


              {/* Link */}

              <div className="col-span-1">

                <Link
                  href={`/article/${article.slug}`}
                  className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-red-100 flex items-center justify-center transition"
                  target="_blank"
                >

                  <ExternalLink size={14} className="text-gray-500" />

                </Link>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}