'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Copy, Tag, Sparkles, Check, Instagram, Twitter } from 'lucide-react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

interface PromptCardProps {
    prompt: string;
    tag: string;
    aiTool: string;
    proTip?: string;
    instagramHandle?: string;
    twitterHandle?: string;
    imageUrl?: string;
}

export default function PromptCard({
    prompt,
    tag,
    aiTool,
    proTip,
    instagramHandle,
    twitterHandle,
    imageUrl,
}: PromptCardProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [copied, setCopied] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const promptRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (promptRef.current) {
            setIsOverflowing(
                promptRef.current.scrollHeight > promptRef.current.clientHeight
            );
        }
    }, [prompt]);

    const handleCopyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(prompt);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 400 : -400,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 400 : -400,
            opacity: 0
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection: number) => {
        setCurrentSlide(currentSlide === 0 ? 1 : 0);
    };

    return (
        <Card className="relative w-full aspect-square max-w-[500px] min-w-[350px] bg-black border border-white/20 overflow-hidden rounded-xl shadow-lg">
            {/* Only show copy button on prompt view */}
            {currentSlide === 0 && (
                <div className="absolute top-4 right-4 z-10">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 bg-background/50 backdrop-blur-sm hover:bg-background/80"
                        onClick={handleCopyToClipboard}
                    >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                </div>
            )}

            <AnimatePresence initial={false} custom={currentSlide}>
                <motion.div
                    key={currentSlide}
                    custom={currentSlide}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold) {
                            paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                            paginate(-1);
                        }
                    }}
                    className="absolute inset-0"
                >
                    {currentSlide === 0 ? (
                        <div className="h-full p-6 flex flex-col">
                            {/* Header with badges */}
                            <div className="flex items-start gap-2 mb-4">
                                <Badge variant="outline" className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20">
                                    <Tag className="w-3 h-3 mr-1" />
                                    {tag}
                                </Badge>
                                <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                                    <Sparkles className="w-3 h-3 mr-1" />
                                    {aiTool}
                                </Badge>
                            </div>

                            {/* Main prompt content */}
                            <div className="flex-1 relative mb-4 overflow-hidden">
                                <p
                                    ref={promptRef}
                                    className="text-sm text-white leading-relaxed"
                                >
                                    {prompt}
                                </p>
                                {isOverflowing && (
                                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                                )}
                            </div>

                            {/* Pro Tip - Compact style */}
                            {proTip && (
                                <div className=" p-3 bg-yellow-500/5 rounded-lg border border-yellow-500/20">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <span className="text-xs font-medium text-yellow-500">💡 Pro Tip</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {proTip}
                                    </p>
                                </div>
                            )}

                            {/* Social handles - centered to avoid overlap */}
                            {(instagramHandle || twitterHandle) && (
                                <div className="flex justify-center gap-2 mt-auto pt-3 border-t border-white/10">
                                    {/* pb-17 */}
                                    {instagramHandle && (
                                        <a
                                            href={`https://instagram.com/${instagramHandle.replace('@', '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 transition-colors"
                                        >
                                            <Instagram className="w-3.5 h-3.5" />
                                            <span className="text-xs font-medium">@{instagramHandle.replace('@', '')}</span>
                                        </a>
                                    )}
                                    {twitterHandle && (
                                        <a
                                            href={`https://x.com/${twitterHandle.replace('@', '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors"
                                        >
                                            <Twitter className="w-3.5 h-3.5" />
                                            <span className="text-xs font-medium">@{twitterHandle.replace('@', '')}</span>
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        imageUrl && (
                            <div className="relative h-full w-full">
                                <Image
                                    src={imageUrl}
                                    alt="Prompt Result"
                                    fill
                                    className="object-cover"
                                    sizes="500px"
                                />
                            </div>
                        )
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Navigation buttons with better positioning */}
            {imageUrl && (
                <div className="absolute left-6 right-6 bottom-6 flex justify-between z-10">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 bg-background/50 backdrop-blur-sm hover:bg-background/80"
                        onClick={() => paginate(-1)}
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 bg-background/50 backdrop-blur-sm hover:bg-background/80"
                        onClick={() => paginate(1)}
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </div>
            )}
        </Card>
    );
}