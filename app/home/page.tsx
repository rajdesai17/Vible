"use client";
import { TrendingCards } from '@/components/trendingCards';
import React from 'react';
import { GrainGradient } from '@paper-design/shaders-react';
import { useRouter } from 'next/navigation';


export default function page() {
    const router = useRouter();

    const handleExploreClick = () => {
        router.push('/trending');
    };

    return (
        <>
            <div className="relative z-10 mx-auto min-h-screen">
                <div className="fixed inset-0 -z-10 pointer-events-none">
                    <GrainGradient
                        height="100vh"
                        width="100vw"
                        colors={[
                            "#7300ff", // color1
                            "#eba8ff", // color2
                            "#00bfff", // color3
                            "#2a00ff"  // color4
                        ]}
                        colorBack="#000000"
                        softness={1.0}
                        intensity={0.0}
                        noise={0.0}
                        shape="corners"
                        offsetX={0.0}
                        offsetY={0.0}
                        scale={1.0}
                        rotation={0}
                        speed={1.0}
                    />
                </div>
                <div className="flex flex-col mx-auto justify-center px-4 sm:px-6 lg:px-8">
                    <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-black text-center leading-tight tracking-tight mt-20">
                        <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                            IMAGINE
                        </span>
                        <span className="block text-gray-200 font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-4">
                            BEYOND LIMITS
                        </span>
                    </h1>
                    <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-bold pt-8 sm:pt-12 text-center px-4 max-w-4xl mx-auto leading-relaxed">
                    A collection of prompts to create trending visuals.                    </p>
                    <div className="flex justify-center mt-8 sm:mt-12">
                        <button 
                            onClick={handleExploreClick}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-lg sm:text-xl px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl"
                        >
                            View Prompt Collection
                        </button>
                    </div>
                </div>
                <TrendingCards />
            </div>
        </>
    );
}
