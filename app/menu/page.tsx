'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    image:string;
}


export default function Menu() {

    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const categories = ['Starters', 'Main Course', 'Desserts'];
    const router = useRouter();
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

    useEffect(() => {
        fetch('/api/getMenuItems')
        .then(res => res.json())
        .then(data => {
            setMenuItems(data);
        })
        .catch(error => {
            console.error('Error fetching menu items:', error);
        });
    }, [])

    const encodeItemForQuery = (item: MenuItem) => {
        try {
            const query = encodeURIComponent(JSON.stringify(item.id));
            router.push(`/item?id=${query}`);
            
        } catch (error) {
            return error;
        }
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-black text-white py-6 px-4 top-0 z-10 shadow-2xl animate-fade-in">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center tracking-tight">MENU</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8 md:py-12">
                {categories.map((category, categoryIndex) => (
                    <section key={category} className="mb-10 sm:mb-12 md:mb-16">
                        <div className={`flex items-center mb-6 sm:mb-8 opacity-0 animate-fade-in-up`} 
                             style={{ animationDelay: `${categoryIndex * 0.2}s`, animationFillMode: 'forwards' }}>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide">
                                {category}
                            </h2>
                            <div className="flex-1 h-px bg-black ml-4"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                            {menuItems
                                .filter(item => item.category === category)
                                .map((item, itemIndex) => (
                                        <div
                                            onClick={() => encodeItemForQuery(item)}
                                            key={item.id}
                                            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-black opacity-0 animate-fade-in-up h-full flex flex-col"
                                            style={{ 
                                                animationDelay: `${(categoryIndex * 0.2) + (itemIndex * 0.1) + 0.3}s`,
                                                animationFillMode: 'forwards'
                                            }}
                                        >
                                            {/* Image Container */}
                                            <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden bg-gray-100 flex-shrink-0">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                                />
                                                {/* Price Badge */}
                                                <div className="absolute top-3 right-3 bg-black text-white px-3 py-1.5 rounded-full shadow-lg">
                                                    <span className="text-sm sm:text-base font-bold">${item.price.toFixed(2)}</span>
                                                </div>
                                            </div>
                                            
                                            {/* Content */}
                                            <div className="p-4 sm:p-5 flex-1 flex flex-col">
                                                <h3 className="text-lg sm:text-xl font-bold mb-2 uppercase tracking-wide line-clamp-1">
                                                    {item.name}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2 flex-1">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                ))}
                        </div>
                    </section>
                ))}
            </main>

            {/* Footer */}
            <footer className="bg-black text-white py-6 px-4 mt-12 opacity-0 animate-fade-in" 
                    style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
                <div className="max-w-6xl mx-auto text-center">
                    <p className="text-xs sm:text-sm text-gray-500">© {new Date().getFullYear()} Restaurant. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}