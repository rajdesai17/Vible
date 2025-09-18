export interface MockPrompt {
    id: string;
    prompt: string;
    tag: string;
    aiTool: string;
    proTip?: string;
    instagramHandle?: string;
    twitterHandle?: string;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
}

const now = new Date();

export const mockPrompts: MockPrompt[] = [
    {
        id: "p5",
        prompt: "Subject turned into a semi-realistic anime character, high-fashion illustration style, glossy details.",
        tag: "Artify",
        aiTool: "Gemini",
        proTip: "Use portrait input, 1:1 aspect ratio for best results.",
        imageUrl: "/pic5.png",
        createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 1).toISOString(),
        updatedAt: new Date(now.getTime() - 1000 * 60 * 60 * 1).toISOString(),
    },
    {
        id: "p4",
        prompt: "Ethereal forest at dusk, captured on a blurry Polaroid with a flash, hazy and surreal.",
        tag: "Dreamcore",
        aiTool: "Gemini",
        proTip: "Add a subtle vignette and reduce clarity.",
        imageUrl: "/pic1.png",
        createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 2).toISOString(),
        updatedAt: new Date(now.getTime() - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
        id: "p3",
        prompt: "Turn your photo into a collectible PVC figurine on a desk, with custom packaging box art.",
        tag: "Viral",
        aiTool: "ChatGPT",
        proTip: "Use hard shadows to simulate desk lamp lighting.",
        imageUrl: "/pic3.png",
        createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 3).toISOString(),
        updatedAt: new Date(now.getTime() - 1000 * 60 * 60 * 3).toISOString(),
    },
    {
        id: "p2",
        prompt: "Street style shot in a neon-lit cyberpunk city, baggy jeans, editorial fashion vibe.",
        tag: "Drip",
        aiTool: "Gemini",
        proTip: "Choose night-time with wet asphalt for reflections.",
        imageUrl: "/pic2.png",
        createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 4).toISOString(),
        updatedAt: new Date(now.getTime() - 1000 * 60 * 60 * 4).toISOString(),
    },
    {
        id: "p1",
        prompt: "Cinematic portrait in a vintage saree, 90s movie style, grainy film texture, moody lighting.",
        tag: "Filmy",
        aiTool: "ChatGPT",
        proTip: "Add film grain and a warm split-tone.",
        imageUrl: "/pic4.png",
        createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 5).toISOString(),
        updatedAt: new Date(now.getTime() - 1000 * 60 * 60 * 5).toISOString(),
    },
];


