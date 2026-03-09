"use client";

import {
    Youtube,
    Twitter,
    Facebook,
    Instagram,
    Linkedin,
    Mail,
    Phone,
    MapPin,
    ArrowUp,
    Smartphone,
    ChevronRight,
} from "lucide-react";
import { breakingNews, politicsNews, courtNews } from "@/data/mockData";

export default function Footer() {
    const latestArticles = [...breakingNews, ...politicsNews, ...courtNews].slice(
        0,
        6
    );

    const footerLinks = {
        Categories: [
            "Breaking News",
            "Politics",
            "Crime",
            "Entertainment",
            "Court News",
            "Investigation",
            "Exclusive",
            "Videos",
        ],
        Company: [
            "About Us",
            "Contact Us",
            "Careers",
            "Advertise",
            "Press Kit",
            "Ethics Policy",
        ],
        Support: [
            "Help Center",
            "Terms of Service",
            "Privacy Policy",
            "Cookie Policy",
            "Accessibility",
            "Sitemap",
        ],
    };

    return (
        <footer className="bg-bg-sidebar text-gray-300 mt-12 relative">
            {/* Back to Top */}
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="bg-primary hover:bg-primary-dark text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                    aria-label="Back to top"
                >
                    <ArrowUp size={18} />
                </button>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 pt-12 pb-6">
                {/* Top Section - 4 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/10">
                    {/* Brand + Contact */}
                    <div>
                        <a href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-white font-black text-sm">CT</span>
                            </div>
                            <div>
                                <h2 className="text-lg font-black text-white tracking-tight leading-none">
                                    Crime<span className="text-primary">Tak</span>
                                </h2>
                                <p className="text-[9px] text-gray-500 font-medium tracking-widest">
                                    FEARLESS JOURNALISM
                                </p>
                            </div>
                        </a>
                        <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                            India&apos;s most trusted source for crime news, investigations,
                            and justice reporting. Delivering fearless journalism since 2020.
                        </p>
                        <div className="space-y-2.5">
                            <div className="flex items-center gap-2.5 text-sm text-gray-400">
                                <Mail size={14} className="text-primary flex-shrink-0" />
                                <span>contact@crimetak.in</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-sm text-gray-400">
                                <Phone size={14} className="text-primary flex-shrink-0" />
                                <span>+91 1800-XXX-XXXX</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-sm text-gray-400">
                                <MapPin size={14} className="text-primary flex-shrink-0" />
                                <span>New Delhi, India</span>
                            </div>
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
                                {title}
                            </h3>
                            <ul className="space-y-2.5">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                                            className="text-sm text-gray-400 hover:text-primary transition-colors flex items-center gap-1 group"
                                        >
                                            <ChevronRight
                                                size={12}
                                                className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"
                                            />
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Middle Section - Latest Articles + App Download */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 py-10 border-b border-white/10">
                    {/* Latest Articles */}
                    <div className="lg:col-span-3">
                        <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
                            Latest Articles
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {latestArticles.map((article) => (
                                <a
                                    key={article.id}
                                    href={`/article/${article.slug}`}
                                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                                >
                                    <div className="w-14 h-11 flex-shrink-0 rounded-md overflow-hidden bg-gray-800">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-xs font-medium text-gray-300 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                                            {article.title}
                                        </h4>
                                        <span className="text-[10px] text-gray-500 mt-1 block">
                                            {article.date}
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* App Download + Social */}
                    <div className="lg:col-span-2">
                        <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
                            Download Our App
                        </h3>
                        <div className="bg-white/5 rounded-xl p-5 mb-5 border border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Smartphone size={28} className="text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white">
                                        Get the CrimeTak App
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        Breaking news alerts &amp; exclusive stories
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <a
                                    href="#"
                                    className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/15 rounded-lg text-center text-xs font-semibold text-white transition-colors"
                                >
                                    App Store
                                </a>
                                <a
                                    href="#"
                                    className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/15 rounded-lg text-center text-xs font-semibold text-white transition-colors"
                                >
                                    Google Play
                                </a>
                            </div>
                        </div>

                        <h3 className="text-white font-bold text-sm mb-3 uppercase tracking-wider">
                            Follow Us
                        </h3>
                        <div className="flex gap-2">
                            {[
                                { icon: Youtube, color: "hover:bg-red-600", label: "YouTube" },
                                { icon: Twitter, color: "hover:bg-blue-500", label: "Twitter" },
                                {
                                    icon: Facebook,
                                    color: "hover:bg-blue-600",
                                    label: "Facebook",
                                },
                                {
                                    icon: Instagram,
                                    color: "hover:bg-pink-500",
                                    label: "Instagram",
                                },
                                {
                                    icon: Linkedin,
                                    color: "hover:bg-blue-700",
                                    label: "LinkedIn",
                                },
                            ].map(({ icon: Icon, color, label }) => (
                                <a
                                    key={label}
                                    href="#"
                                    className={`w-9 h-9 bg-white/10 ${color} rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all`}
                                    aria-label={label}
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
                    <p className="text-xs text-gray-500 text-center sm:text-left">
                        © {new Date().getFullYear()} CrimeTak. All rights reserved. |
                        Fearless Journalism Since 2020
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        <a href="#" className="hover:text-primary transition-colors">
                            Privacy
                        </a>
                        <a href="#" className="hover:text-primary transition-colors">
                            Terms
                        </a>
                        <a href="#" className="hover:text-primary transition-colors">
                            Cookies
                        </a>
                        <a href="#" className="hover:text-primary transition-colors">
                            RSS
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
