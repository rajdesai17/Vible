import { NextRequest, NextResponse } from 'next/server';
import { mockPrompts } from '@/lib/mockPrompts';

// --- Prisma version (commented out, keep for later use) ---
// import { prisma } from '@/lib/prisma';
// const DEFAULT_PAGE_SIZE = 20;
// const MAX_PAGE_SIZE = 50;
// export async function GET(request: NextRequest) {
//     try {
//         const { searchParams } = new URL(request.url);
//         const cursor = searchParams.get('cursor');
//         const tag = searchParams.get('tag');
//         const aiTool = searchParams.get('aiTool');
//         const limit = searchParams.get('limit') ?
//             Math.min(parseInt(searchParams.get('limit')!), MAX_PAGE_SIZE) :
//             DEFAULT_PAGE_SIZE;
//         const where: any = {};
//         if (tag) where.tag = tag;
//         if (aiTool) where.aiTool = aiTool;
//         if (cursor) {
//             where.id = { lt: cursor };
//         }
//         const prompts = await prisma.prompt.findMany({
//             where,
//             orderBy: [ { createdAt: 'desc' }, { id: 'desc' } ],
//             take: limit + 1,
//         });
//         const total = await prisma.prompt.count({ where });
//         const hasNextPage = prompts.length > limit;
//         const items = hasNextPage ? prompts.slice(0, -1) : prompts;
//         const nextCursor = hasNextPage ? items[items.length - 1].id : undefined;
//         return NextResponse.json({ items, pageInfo: { hasNextPage, nextCursor, total } }, { status: 200 });
//     } catch (error) {
//         console.error('Error fetching prompts:', error);
//         return NextResponse.json({ error: 'Failed to fetch prompts' }, { status: 500 });
//     }
// }

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 50;

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const cursor = searchParams.get('cursor');
        const tag = searchParams.get('tag');
        const aiTool = searchParams.get('aiTool');
        const limit = searchParams.get('limit') ?
            Math.min(parseInt(searchParams.get('limit')!), MAX_PAGE_SIZE) :
            DEFAULT_PAGE_SIZE;

        // Filter
        let filtered = mockPrompts.slice();
        if (tag) filtered = filtered.filter(p => p.tag === tag);
        if (aiTool) filtered = filtered.filter(p => p.aiTool === aiTool);

        // Sort desc by createdAt then id
        filtered.sort((a, b) => {
            const d = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            if (d !== 0) return d;
            return b.id.localeCompare(a.id);
        });

        // Cursor pagination (lt by id within sorted array)
        let startIndex = 0;
        if (cursor) {
            const idx = filtered.findIndex(p => p.id === cursor);
            startIndex = idx >= 0 ? idx + 1 : 0;
        }

        const slice = filtered.slice(startIndex, startIndex + limit + 1);
        const hasNextPage = slice.length > limit;
        const items = hasNextPage ? slice.slice(0, -1) : slice;
        const nextCursor = hasNextPage ? items[items.length - 1].id : undefined;

        return NextResponse.json({
            items,
            pageInfo: {
                hasNextPage,
                nextCursor,
                total: filtered.length,
            }
        }, { status: 200 });
    } catch (error) {
        console.error('Error fetching prompts:', error);
        return NextResponse.json({ error: 'Failed to fetch prompts' }, { status: 500 });
    }
}
