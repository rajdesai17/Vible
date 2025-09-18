import { NextRequest, NextResponse } from 'next/server';
import { mockPrompts } from '@/lib/mockPrompts';

// --- Prisma version (commented out, keep for later use) ---
// import { prisma } from '@/lib/prisma';
// import { AITool, Tag } from '@prisma/client';
// export async function POST(request: NextRequest) {
//     try {
//         const body = await request.json();
//         const {
//             prompt,
//             tag,
//             aiTool,
//             proTip,
//             instagramHandle,
//             twitterHandle,
//             imageUrl,
//         } = body;
//         if (!prompt || !tag || !aiTool) {
//             return NextResponse.json({ error: 'Prompt, tag, and AI tool are required.' }, { status: 400 });
//         }
//         if (!Object.values(Tag).includes(tag as Tag)) {
//             return NextResponse.json({ error: 'Invalid tag value.' }, { status: 400 });
//         }
//         if (!Object.values(AITool).includes(aiTool as AITool)) {
//             return NextResponse.json({ error: 'Invalid AI tool value.' }, { status: 400 });
//         }
//         const newPrompt = await prisma.prompt.create({
//             data: { prompt, tag, aiTool, proTip, instagramHandle, twitterHandle, imageUrl },
//         });
//         return NextResponse.json(newPrompt, { status: 201 });
//     } catch (error) {
//         console.error('Error creating prompt:', error);
//         if (error instanceof SyntaxError) {
//             return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
//         }
//         return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
//     }
// }

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { prompt, tag, aiTool, proTip, instagramHandle, twitterHandle, imageUrl } = body;

        if (!prompt || !tag || !aiTool) {
            return NextResponse.json({ error: 'Prompt, tag, and AI tool are required.' }, { status: 400 });
        }

        const id = `p${Math.random().toString(36).slice(2, 8)}`;
        const now = new Date().toISOString();
        const newPrompt = {
            id,
            prompt,
            tag,
            aiTool,
            proTip: proTip || undefined,
            instagramHandle: instagramHandle || undefined,
            twitterHandle: twitterHandle || undefined,
            imageUrl: imageUrl || undefined,
            createdAt: now,
            updatedAt: now,
        };

        // Push into mock array to simulate runtime persistence (resets on server restart or redeploy)
        mockPrompts.unshift(newPrompt);

        return NextResponse.json(newPrompt, { status: 201 });
    } catch (error) {
        console.error('Error creating prompt:', error);
        if (error instanceof SyntaxError) {
            return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
    }
}