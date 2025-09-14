import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AITool, Tag } from '@prisma/client';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            prompt,
            tag,
            aiTool,
            proTip,
            instagramHandle,
            twitterHandle,
            imageUrl,
        } = body;

        if (!prompt || !tag || !aiTool) {
            return NextResponse.json({ error: 'Prompt, tag, and AI tool are required.' }, { status: 400 });
        }

        if (!Object.values(Tag).includes(tag as Tag)) {
            return NextResponse.json({ error: 'Invalid tag value.' }, { status: 400 });
        }
        if (!Object.values(AITool).includes(aiTool as AITool)) {
            return NextResponse.json({ error: 'Invalid AI tool value.' }, { status: 400 });
        }

        const newPrompt = await prisma.prompt.create({
            data: {
                prompt: prompt,
                tag: tag,
                aiTool: aiTool,
                proTip: proTip,
                instagramHandle: instagramHandle,
                twitterHandle: twitterHandle,
                imageUrl: imageUrl,
            },
        });

        return NextResponse.json(newPrompt, { status: 201 });

    } catch (error) {
        console.error('Error creating prompt:', error);
        if (error instanceof SyntaxError) {
            return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
    }
}