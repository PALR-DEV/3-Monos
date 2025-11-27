'use client';
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MenuItem } from "../menu/page";
import Link from "next/link";

export default function Item() {
    const searchParam = useSearchParams();
    const [itemData, setItemData] = useState<MenuItem | null>(null);
    const [selectedComplements, setSelectedComplements] = useState<string[]>([]);
    const [quantity, setQuantity] = useState(1);
    const [complementData, setComplementData] = useState<any[]>([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const itemParam = searchParam.get('id');
        if(itemParam) {
            const itemId = JSON.parse(decodeURIComponent(itemParam));
            fetch(`/api/getMenuItemWithId?id=${itemId}`)
            .then(res => res.json())
            .then(data => {
                setItemData(data);
            })

            fetch(`/api/getComplementsbasedOnId?id=${itemId}`)
            .then(res => res.json())
            .then(data => {
                setComplementData(data);
            })
            .catch(error => {
                console.error('Error fetching complements:', error);
            });
        }
    }, [searchParam]);

    const complements = [
        { id: 'rice', name: 'White Rice', price: 2.50 },
        { id: 'sweet-potato', name: 'Sweet Potatoes', price: 3.00 },
        { id: 'black-beans', name: 'Black Beans', price: 2.00 },
        { id: 'plantain', name: 'Fried Plantain', price: 3.50 },
        { id: 'salad', name: 'Mixed Salad', price: 4.00 },
        { id: 'yuca', name: 'Cassava', price: 2.75 }
    ];

    const toggleComplement = (complementId: string) => {
        setComplementData(prev => 
            prev.includes(complementId) 
                ? prev.filter(id => id !== complementId)
                : [...prev, complementId]
        );
    };

    const calculateTotal = () => {
        const complementsPrice = selectedComplements.reduce((total, id) => {
            const complement = complements.find(c => c.id === id);
            return total + (complement?.price || 0);
        }, 0);
        return (itemData!.price + complementsPrice) * quantity;
    };

    if(!itemData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div role="status" aria-label="Loading" className="flex flex-col items-center">
                    <svg className="w-14 h-14 text-gray-800 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    <p className="mt-3 text-gray-500 text-sm">Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Image Section */}
            <div className="relative animate-fade-in">
                
                <Link  href="/menu"
                    className="absolute top-4 left-4 z-10 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 backdrop-blur-sm animate-fade-in"
                    style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
                >
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>

                <div className="h-[50vh] bg-gray-100 overflow-hidden animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                    <img 
                        src={itemData.image} 
                        alt={itemData.name}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Details Section */}
            <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8">
                <div className="max-w-2xl mx-auto space-y-8">
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                        <h1 className="text-3xl lg:text-4xl font-bold text-black mb-4">{itemData.name}</h1>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">{itemData.description}</p>
                        <div className="text-2xl font-bold text-black">${itemData.price.toFixed(2)}</div>
                    </div>

                    {/* Complements Selection */}
                    <div className="border-t border-gray-200 pt-8 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
                        <h3 className="text-xl font-semibold text-black mb-6">Add Complements</h3>
                        <div className="grid gap-3">
                            {complementData.map((complement, index) => (
                                <div 
                                    key={complement.id}
                                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all duration-200 animate-fade-in-up ${
                                        selectedComplements.includes(complement.id)
                                            ? 'border-black bg-black text-white'
                                            : 'border-gray-200 bg-white hover:border-gray-400'
                                    }`}
                                    style={{ animationDelay: `${0.6 + (index * 0.1)}s`, animationFillMode: 'both' }}
                                    onClick={() => toggleComplement(complement.id)}
                                >
                                    <div className="flex items-center">
                                        <div className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center ${
                                            selectedComplements.includes(complement.id)
                                                ? 'border-white bg-white'
                                                : 'border-gray-300'
                                        }`}>
                                            {selectedComplements.includes(complement.id) && (
                                                <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className="font-medium">{complement.name}</span>
                                    </div>
                                    <span className="font-semibold">
                                        {complement.price < 1 
                                            ? `+${(complement.price * 100).toFixed(0)}¢` 
                                            : `+$${complement.price.toFixed(2)}`
                                        }
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="border-t border-gray-200 pt-8 animate-fade-in-up" style={{ animationDelay: '1.2s', animationFillMode: 'both' }}>
                        <h3 className="text-xl font-semibold text-black mb-4">Quantity</h3>
                        <div className="flex items-center space-x-4">
                            <button 
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:border-black transition-colors duration-200"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                            </button>
                            <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                            <button 
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:border-black transition-colors duration-200"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Total and Add to Cart */}
                    <div className="border-t border-gray-200 pt-8 animate-fade-in-up" style={{ animationDelay: '1.4s', animationFillMode: 'both' }}>
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-xl font-semibold text-black">Total:</span>
                            <span className="text-2xl font-bold text-black">${calculateTotal().toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-black text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors duration-200">
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}