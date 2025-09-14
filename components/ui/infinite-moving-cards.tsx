"use client";

import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image"; // CHANGE 1: Import StaticImageData
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    image?: StaticImageData; // CHANGE 1: Update the type
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    // This useEffect is now only for setting CSS variables
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  // ... (getDirection and getSpeed functions remain the same)
  const getDirection = () => { /* ... */ };
  const getSpeed = () => { /* ... */ };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {/* CHANGE 4: Render the items array twice for a seamless loop */}
        {[...items, ...items].map((item, idx) => (
          <li
            className="relative w-[300px] max-w-full shrink-0 rounded-2xl border border-zinc-200 bg-black/50 backdrop-blur-sm px-4 py-4 md:w-[350px] dark:border-zinc-700 hover:scale-105 transition-all duration-300 cursor-pointer group"
            key={`${item.name}-${idx}`}
          >
            <div className="relative h-[450px] w-full overflow-hidden rounded-lg">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500" />
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-lg font-semibold text-white mb-4">{item.quote}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">{item.name}</span>
                  <span className="text-sm text-gray-300">{item.title}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};