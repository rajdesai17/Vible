// app/trending/page.tsx
'use client';

import { useState, useEffect } from 'react';
import PromptCard from '@/components/promptCard';
import { Button } from '@/components/ui/button';

import { PaginatedResponse } from '@/lib/types';

interface Prompt {
    id: string;
    prompt: string;
    tag: string;
    aiTool: string;
    proTip?: string;
    instagramHandle?: string;
    twitterHandle?: string;
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

export default function TrendingPage() {
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [hasNextPage, setHasNextPage] = useState(false);
    const [nextCursor, setNextCursor] = useState<string | undefined>();
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        fetchPrompts();
    }, []);

    const fetchPrompts = async (cursor?: string) => {
        try {
            setLoading(true);
            const url = new URL('/api/getprompts', window.location.origin);
            url.searchParams.set('limit', '20');
            if (cursor) url.searchParams.set('cursor', cursor);

            const response = await fetch(url.toString());
            if (!response.ok) {
                throw new Error('Failed to fetch prompts');
            }
            const data: PaginatedResponse<Prompt> = await response.json();

            if (cursor) {
                setPrompts(prev => [...prev, ...data.items]);
            } else {
                setPrompts(data.items);
            }

            setHasNextPage(data.pageInfo.hasNextPage);
            setNextCursor(data.pageInfo.nextCursor);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
            setInitialLoad(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 py-4 sm:py-6 lg:py-8">
            {/* Container with responsive margins */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-20">
                <h1 className="text-3xl sm:text-4xl font-semibold text-gray-400 text-center mb-8 sm:mb-10 lg:mb-12">
                    Trending Prompts
                </h1>

                {/* Cards container - Maximum 3 cards per row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 place-items-center">
                    {prompts.map((promptData) => (
                        <div key={promptData.id} className="w-full max-w-[380px] flex justify-center">
                            <PromptCard
                                prompt={promptData.prompt}
                                tag={promptData.tag}
                                aiTool={promptData.aiTool}
                                proTip={promptData.proTip}
                                instagramHandle={promptData.instagramHandle}
                                twitterHandle={promptData.twitterHandle}
                                imageUrl={promptData.imageUrl}
                            />
                        </div>
                    ))}
                </div>

                {prompts.length === 0 && !initialLoad && (
                    <div className="text-center text-gray-400 mt-12">
                        <p>No prompts found. Be the first to submit one!</p>
                    </div>
                )}

                {hasNextPage && (
                    <div className="flex justify-center mt-8 mb-8">
                        <Button
                            onClick={() => fetchPrompts(nextCursor)}
                            disabled={loading}
                            className="bg-purple-500 hover:bg-purple-600 text-white"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white animate-spin rounded-full"></div>
                                    Loading...
                                </div>
                            ) : (
                                'Load More'
                            )}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}