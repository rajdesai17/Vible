import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Plus } from 'lucide-react';

export default function Navbar() {
    return (
        <>
            <header className=" bg-transparent backdrop-blur-sm sticky top-0 z-50 border-rounded-lg">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
                    <div className="flex items-center space-x-2">
                        {/* Logo */}
                        <Image src="/Logo.png" alt="Logo" width={40} height={40} className="" />
                        <span className="text-2xl font-semibold bg-gradient-to-r text-white dark:text-white bg-clip-text hidden sm:block ">
                            Vible
                        </span>
                    </div>
                    <div className='flex items-center space-x-4'>
                        {/* Navigation Links */}
                        <nav className=" md:flex space-x-4">
                            <Link href="/home" className="text-white font-bold  hover:text-blue-900">Home</Link>
                            <Link href="/trending " className="text-white font-medium hover:text-blue-900">Trending</Link>
                            {/* <Link href="/submit" className="text-white font-medium hover:text-blue-900">Submit</Link> */}
                        </nav>


                    </div>
                    {/* <div className="flex items-center space-x-4">
                        <Link href="/submit" className="text-white font-medium hover:text-blue-900">Submit prompt</Link>
                    </div> */}

                    <div className="flex items-center">
                        <Link
                            href="/submit"
                            className="
            px-4 py-2 
            text-sm font-medium text-white 
            bg-white/5  // Very subtle transparent background
            border border-white/20 
            rounded-lg 
            backdrop-blur-sm // Adds a frosted glass effect
            transition-all duration-300 ease-in-out 
            hover:bg-white/10 
            hover:border-white/40
        "
                        >
                            Submit Prompt
                        </Link>
                    </div>
                </div>
            </header>

        </>
    )
}

