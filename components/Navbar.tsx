"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";



export default function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div
            className={cn("fixed top-0 inset-x-0 w-full mx-auto z-50 bg-black/20 backdrop-blur-md border-b border-purple-900/30", className)}
        >
            <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                        PromptVault
                    </h1>
                </div>
                <Menu setActive={setActive}>
                    <MenuItem setActive={setActive} active={active} item="Trending">
                        <HoveredLink href="/trending">Explore Trending Prompts</HoveredLink>
                    </MenuItem>
                    <MenuItem setActive={setActive} active={active} item="Submit">
                        <HoveredLink href="/submit">Submit New Prompt</HoveredLink>
                    </MenuItem>
                    <MenuItem setActive={setActive} active={active} item="Categories">
                        <HoveredLink href="/categories">Browse Categories</HoveredLink>
                    </MenuItem>
                </Menu>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium">
                    Explore Prompt
                </Button>
            </div>
        </div>
    );
}
