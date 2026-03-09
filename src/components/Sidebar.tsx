"use client";

import { useState } from "react";
import {
    Home,
    Flame,
    Landmark,
    Search,
    Map,
    Scale,
    Shield,
    FileText,
    Globe,
    Megaphone,
    Hash,
    ChevronRight,
    Youtube,
    Twitter,
    Facebook,
    Instagram,
    Linkedin,
} from "lucide-react";

const menu = [
    { id: 1, label: "Home", icon: Home },
    { id: 2, label: "Top News", icon: Flame },
    { id: 3, label: "Politics", icon: Landmark },
    { id: 4, label: "Investigation", icon: Search },
    { id: 5, label: "States", icon: Map, submenu: true },
    { id: 6, label: "Court News", icon: Scale },
    { id: 7, label: "Cyber Crime", icon: Shield },
    { id: 8, label: "Unsolved Cases", icon: FileText },
    { id: 9, label: "International", icon: Globe },
    { id: 10, label: "Awareness", icon: Megaphone },
    { id: 11, label: "Topics", icon: Hash },
];

export default function Sidebar() {
    const [active, setActive] = useState(1);

    return (
        <aside
            className="hidden md:flex rounded-b-2xl flex-col w-[220px] shadow-card border-gray-200 bg-white
      sticky top-[140px] h-[calc(100vh-140px)]"
        >
            {/* menu */}
            <nav className="flex flex-col overflow-y-auto py-2">

                {menu.map((item) => {
                    const Icon = item.icon;

                    return (
                        <a
                            key={item.id}
                            onClick={() => setActive(item.id)}
                            className={`flex items-center justify-between px-4 py-2 text-sm cursor-pointer
              
              ${active === item.id
                                    ? "bg-red-100 text-red-600 border-l-4 border-red-600"
                                    : "text-gray-700 hover:bg-red-50"
                                }
              
              `}
                        >
                            <div className="flex items-center gap-3">
                                <Icon size={16} />
                                {item.label}
                            </div>

                            {item.submenu && <ChevronRight size={14} />}
                        </a>
                    );
                })}
            </nav>

            {/* social icons */}
            <div className="flex gap-2 p-4 border-t">
                {[
                    { icon: Youtube, color: "hover:bg-red-600", label: "YouTube" },
                    { icon: Twitter, color: "hover:bg-blue-500", label: "Twitter" },
                    { icon: Facebook, color: "hover:bg-blue-600", label: "Facebook" },
                    { icon: Instagram, color: "hover:bg-pink-500", label: "Instagram" },
                    { icon: Linkedin, color: "hover:bg-blue-700", label: "LinkedIn" },
                ].map(({ icon: Icon, color, label }) => (
                    <a
                        key={label}
                        href="#"
                        className={`w-9 h-9 bg-gray-100 ${color} rounded-lg flex items-center justify-center text-gray-500 hover:text-white transition-all`}
                        aria-label={label}
                    >
                        <Icon size={16} />
                    </a>
                ))}
            </div>
        </aside>
    );
}
