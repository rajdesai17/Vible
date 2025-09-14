import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 50;

export async function GET(request: NextRequest) {
    try {
        // Get query parameters for filtering/pagination
        const { searchParams } = new URL(request.url);
        const cursor = searchParams.get('cursor'); // ID of the last item
        const tag = searchParams.get('tag');
        const aiTool = searchParams.get('aiTool');
        const limit = searchParams.get('limit') ?
            Math.min(parseInt(searchParams.get('limit')!), MAX_PAGE_SIZE) :
            DEFAULT_PAGE_SIZE;

        // Build where clause for filtering
        const where: any = {};
        if (tag) where.tag = tag;
        if (aiTool) where.aiTool = aiTool;

        // Add cursor condition if provided
        if (cursor) {
            where.id = {
                lt: cursor // Get items with ID less than the cursor
            };
        }

        // Get one extra item to determine if there are more pages
        const prompts = await prisma.prompt.findMany({
            where,
            orderBy: [
                { createdAt: 'desc' },
                { id: 'desc' } // Secondary sort for stable pagination
            ],
            take: limit + 1, // Take one extra to check for next page
        });

        // Get total count (optional, remove if not needed)
        const total = await prisma.prompt.count({ where });

        // Check if there are more items
        const hasNextPage = prompts.length > limit;
        const items = hasNextPage ? prompts.slice(0, -1) : prompts;
        const nextCursor = hasNextPage ? items[items.length - 1].id : undefined;

        return NextResponse.json({
            items,
            pageInfo: {
                hasNextPage,
                nextCursor,
                total
            }
        }, { status: 200 });

    } catch (error) {
        console.error('Error fetching prompts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch prompts' },
            { status: 500 }
        );
    }
}
