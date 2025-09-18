"use client";
import { TrendingCards } from '@/components/trendingCards';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import React from 'react'
import { GrainGradient } from '@paper-design/shaders-react';

export default function page() {

    return (
        <>
            <div className="relative z-10 mx-auto ">
                <div className="absolute inset-0 -z-10">
                    <GrainGradient
                        height={"100vh"}
                        width={"100%"}
                        colors={["#7300ff", "#eba8ff", "#00bfff", "#2b00ff"]}
                        colorBack="#000000"
                        softness={0.5}
                        intensity={0.5}
                        noise={0.1}
                        shape="corners"
                        offsetX={0}
                        offsetY={0}
                        scale={2}
                        rotation={0}
                        speed={1}
                    />
                </div>
                <div className='flex flex-col mx-auto justify-center mt-10 px-4 sm:px-6 lg:px-8 '>

                    <h1 className='text-4xl sm:text-5xl md:text-6xl text-gray-300 font-medium text-center'>
                        Unlock the World of <span className='block'>Visual Prompts</span>
                    </h1>
                    <p className='text-base sm:text-lg text-gray-500 font-medium pt-6 sm:pt-8 text-center px-4'>
                        Discover, Filter, and fall in love with the prompts that speak your vibe.
                    </p>
                </div>

                <div className='flex flex-wrap justify-center items-center my-8 gap-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
                    <HoverBorderGradient className="text-sm sm:text-base cursor-pointer" >
                        <span className='text-white'>Vintage Desi</span>
                    </HoverBorderGradient>
                    <HoverBorderGradient className="text-sm sm:text-base cursor-pointer" >
                        <span className='text-white'>Delulu</span>
                    </HoverBorderGradient>
                    <HoverBorderGradient className="text-sm sm:text-base cursor-pointer" >
                        <span className='text-white'>Artify</span>
                    </HoverBorderGradient>
                    <HoverBorderGradient className="text-sm sm:text-base cursor-pointer" >
                        <span className='text-white'>Baddie Mode</span>
                    </HoverBorderGradient>
                    <HoverBorderGradient className="text-sm sm:text-base cursor-pointer" >
                        <span className='text-white'>Going Viral</span>
                    </HoverBorderGradient>

                </div>
                <TrendingCards />

            </div>

        </>

    )
}

