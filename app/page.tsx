import Link from "next/link"

export default function Home() {
   
    return (
        <div className="h-screen overflow-hidden relative flex items-center justify-center">
            <img 
                src="https://images.pexels.com/photos/32399761/pexels-photo-32399761.jpeg" 
                alt="Background" 
                className="absolute inset-0 w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"></div>
            <div className="relative z-10 text-center text-white px-4 sm:px-6 md:px-8 max-w-3xl mx-auto animate-fade-in-up">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-lg tracking-tight leading-tight">3 Monos</h1>
                    <Link href="/menu" className="bg-white/90 hover:bg-white text-black font-semibold py-3 px-12 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50">
                        Order now
                    </Link>
            </div>
        </div>
    )
}
