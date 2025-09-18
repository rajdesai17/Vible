"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { mockPrompts } from "@/lib/mockPrompts";

export function TrendingCards() {
    return (
        <div className="h-[32rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
            />
        </div>
    );
}

const testimonials = mockPrompts.map(p => ({
    quote: p.prompt,
    name: p.tag,
    title: p.aiTool,
    image: p.imageUrl ?? "",
}));


// const testimonials: {
//     quote: string;
//     name: string;
//     title: string;
//     image: StaticImageData;
// }[] = [
//         {
//             quote: "Cinematic portrait in a vintage saree, 90s movie style, grainy film texture, moody lighting.",
//             name: "Retro Reels",
//             title: "Filmy",
//             image: pic4,
//         },
//         {
//             quote: "Street style shot in a neon-lit cyberpunk city, baggy jeans, editorial fashion vibe.",
//             name: "Urban Edge",
//             title: "Drip",
//             image: pic2,
//         },
//         {
//             quote: "Turn your photo into a collectible PVC figurine on a desk, with custom packaging box art.",
//             name: "Figure Trend",
//             title: "Viral",
//             image: pic3,
//         },
//         {
//             quote: "Ethereal forest at dusk, captured on a blurry Polaroid with a flash, hazy and surreal.",
//             name: "Fever Dream",
//             title: "Dreamcore",
//             image: pic1,
//         },
//         {
//             quote: "Subject turned into a semi-realistic anime character, high-fashion illustration style, glossy details.",
//             name: "Sketch Stylize",
//             title: "Anime",
//             image: pic5,
//         },
//     ];
