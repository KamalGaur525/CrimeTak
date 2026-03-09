export interface NewsArticle {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    author: string;
    date: string;
    category: string;
    categoryColor: string;
    slug: string;
    isVideo?: boolean;
    videoUrl?: string;
    readTime?: string;
}

export interface TrendingTopic {
    id: number;
    name: string;
    count: string;
}

export interface MenuItem {
    id: number;
    label: string;
    icon: string;
    href: string;
    badge?: string;
}
