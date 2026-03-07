"use client";

import { useState } from "react";
import {
    Search,
    Menu,
    X,
 MessageCircle,
    Sun,
    Moon,
    Youtube,
    Twitter,
    Facebook, 
    Instagram,
} from "lucide-react";

export default function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        "Home",
        "Breaking",
        "Politics",
        "Crime",
        "Court",
        "Investigation",
        "Videos",
        "Exclusive",
    ];
    const news = [
  "Major Security Breach at Airport",
  "Supreme Court Landmark Ruling on Digital Privacy",
  "Cybercrime Ring Busted in Multi-State Operation",
  "Parliament Passes Anti-Corruption Bill",
  "Election Commission Announces Schedule",
  "Stock Market Hits Record High",
];

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
            {/* Top Bar - Breaking News Ticker */}
            <div className="bg-primary text-white">
                <div className="max-w-[1400px] mx-auto px-4 py-1.5 flex items-center gap-3">
                    <span className="flex-shrink-0 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                        <span className="w-2 h-2 bg-white rounded-full pulse-dot" />
                        LIVE
                    </span>
                    <div className="overflow-hidden flex-1">
                        <div className="overflow-hidden flex-1 ticker-wrapper">
  <div className="ticker-track">

    {[...news, ...news].map((item, i) => (
      <span key={i} className="ticker-item flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
        {item}
      </span>
    ))}

  </div>
</div>
                    </div>
                    <span className="flex-shrink-0 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                       News  <span className="w-2 h-2 bg-white rounded-full pulse-dot" />
                      
                    </span>
                </div>
            </div>

            {/* Main Header */}
            <div className="max-w-[1400px] mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Left: Menu + Logo */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>

                        <a href="/" className="flex items-center gap-2 group">
                            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                                <span className="text-white font-black text-sm">CT</span>
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-xl font-black text-text-dark tracking-tight leading-none">
                                    Crime<span className="text-primary">Tak</span>
                                </h1>
                                <p className="text-[10px] text-text-gray font-medium -mt-0.5 tracking-wide">
                                    FEARLESS JOURNALISM
                                </p>
                            </div>
                        </a>
                    </div>

                    {/* Center: Search Bar (Desktop) */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search news, topics, people..."
                                className="w-full h-10 pl-10 pr-4 rounded-full bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-gray-400"
                            />
                            <Search
                                size={16}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="Search"
                        >
                            <Search size={20} className="text-text-gray" />
                        </button>

                       <button
  className="p-2 rounded-lg hover:bg-green-50 transition-colors relative group"
  aria-label="WhatsApp"
>
  <MessageCircle size={20} className="text-text-gray group-hover:text-green-600" />

  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-500 rounded-full" />
</button>

                        <div className="hidden lg:flex items-center gap-1 ml-2 pl-3 border-l border-gray-200">
                            <a href="#" className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-600 text-gray-400 transition-colors" aria-label="YouTube">
                                <Youtube size={17} />
                            </a>
                            <a href="#" className="p-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-500 text-gray-400 transition-colors" aria-label="Twitter">
                                <Twitter size={17} />
                            </a>
                            <a href="#" className="p-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 text-gray-400 transition-colors" aria-label="Facebook">
                                <Facebook size={17} />
                            </a>
                            <a href="#" className="p-1.5 rounded-lg hover:bg-pink-50 hover:text-pink-500 text-gray-400 transition-colors" aria-label="Instagram">
                                <Instagram size={17} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Bar */}
            <nav className="border-t border-gray-100 bg-white">
                <div className="max-w-[1400px] mx-auto px-4">
                    <div className="flex items-center gap-0.5 overflow-x-auto scroll-container py-0.5">
                        {navItems.map((item, index) => (
                            <a
                                key={item}
                                href={`/${item.toLowerCase()}`}
                                className={`px-3.5 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors rounded-lg ${index === 0
                                        ? "text-primary"
                                        : "text-text-dark hover:text-primary hover:bg-red-50/50"
                                    }`}
                            >
                                {item}
                            </a>
                        ))}
                        <div className="flex items-center ml-auto gap-2 pl-4">
                            <span className="text-xs text-text-gray font-medium">
                                {new Date().toLocaleDateString("en-IN", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Search Overlay */}
            {isSearchOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 p-4 shadow-lg animate-fade-in">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search news, topics, people..."
                            className="w-full h-11 pl-10 pr-4 rounded-full bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                            autoFocus
                        />
                        <Search
                            size={16}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                    </div>
                </div>
            )}

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-xl animate-fade-in z-50">
                    <div className="p-4 space-y-1">
                        {navItems.map((item) => (
                            <a
                                key={item}
                                href={`/${item.toLowerCase()}`}
                                className="block px-4 py-3 text-sm font-semibold text-text-dark hover:bg-red-50 hover:text-primary rounded-lg transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
