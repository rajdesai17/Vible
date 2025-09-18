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
        id: "p13",
        prompt: "Take a picture with a Polaroid camera. The photo should look like a normal photo, without any clear subject or props. The photo should have a slight blur a consistent light source. Such as a flash from a dark room, spread throughout the photo. Do not change the faces. Replace the background behind the two people with a white curtain.",
        tag: "Viral",
        aiTool: "Gemini",
        proTip: "Maintain authentic Polaroid aesthetic with slight blur.",
        imageUrl: "/prompt10.png",
        createdAt: new Date(now.getTime() - 1000 * 60 * 1).toISOString(),
        updatedAt: new Date(now.getTime() - 1000 * 60 * 1).toISOString(),
    },
    {
        id: "p6",
        prompt: "Create a full-length photorealistic image of the uploaded person as a 1970s Bollywood superstar. Scene: outside a Mumbai cinema hall during a film premiere, marquee glowing in neon, vintage Bollywood posters on the walls. The subject is styled in Western-inspired Bollywood glamour of the 1970s, a shimmering sequined evening gown or satin jumpsuit with flared bottoms, a feather boa or faux fur stole draped over the shoulders, and platform heels. Accessories include oversized tinted sunglasses, chunky jewellery, and a clutch bag. Hair styled in voluminous waves or a glamorous blow-dry, with bold eyeliner and glossy lipstick completing the look. Surround them with flashing cameras, paparazzi holding vintage film cameras, and a crowd of fans reaching out for autographs. Add authentic 1970s colour grading (warm tones, film grain, cinematic contrast). Capture the aura of a confident, glamorous star making a grand entrance – charismatic, stylish, and larger-than-life.",
        tag: "Filmy",
        aiTool: "Gemini",
        proTip: "Upload a full-body photo; prefer 3:4 or 2:3 portrait.",
        imageUrl: "/prompt1.png",
        createdAt: new Date(now.getTime() - 1000 * 60 * 10).toISOString(),
        updatedAt: new Date(now.getTime() - 1000 * 60 * 10).toISOString(),
    },
    {
        id: "p7",
        prompt: "Create a giant hyper-realistic statue based on the given photo, keeping the original face exactly the same without changes. The statue stands tall in the middle of a roundabout in Delhi, near a famous historical landmark. The statue is still under construction, surrounded by scaffolding, with many construction workers in yellow helmets and orange vests climbing, welding, and working on it. Parts of the statue's body are still exposed metal framework, while other sections are already detailed and finished. The background shows the realistic atmosphere of Connaught Place: crowded streets with colourful rickshaws, packed buses, and small cars circling the roundabout. Street vendors with tea stalls, fruit carts, and colourful umbrellas line the roadside. Shop signs, big billboards, and messy hanging electric wires crisscross above the streets, creating the typical CP vibe. The bright daytime sky shines above, with tropical trees and a bustling, lively atmosphere. Style: photorealistic, vibrant, and full of life.",
        tag: "Viral",
        aiTool: "Gemini",
        proTip: "Use wide-angle composition; keep face identity locked.",
        imageUrl: "/prompt2.png",
        createdAt: new Date(now.getTime() - 1000 * 60 * 9).toISOString(),
        updatedAt: new Date(now.getTime() - 1000 * 60 * 9).toISOString(),
    },
    {
        id: "p8",
        prompt: "Make my photo an overhead high-angle 3:4 full-body shot of a man lying relaxed on the hood of a red Lamborghini Urus in a dim basement garage. Wearing a crisp white open-collar shirt, brown trousers, polished black shoes, and a leather strap watch. Tattoo visible on the forearm. Soft sunbeam lighting with natural reflections on the car, cinematic warm colour grading, shallow depth of field, creamy bokeh, hyper-realistic 8K detail, billionaire vibe.",
        tag: "Drip",
        aiTool: "Gemini",
        proTip: "Keep 3:4 portrait and overhead angle for accuracy.",
        imageUrl: "/prompt3.png",
        createdAt: new Date(now.getTime() - 1000 * 60 * 8).toISOString(),
        updatedAt: new Date(now.getTime() - 1000 * 60 * 8).toISOString(),
    },
    {
        id: "p9",
        prompt: "Create a retro, vintage, grainy but bright image of the reference picture, but draped in a perfect beige-colour, Pinterest-y aesthetic retro saree. It must feel like a 90s movie, brown hair, baddie with a small flower tucked visibly into her wavy hair, and a romantic, windy environment. The girl is standing against a solid wall, deep shadows and contrast drama, creating a mysterious and artistic atmosphere where the lighting is warm with the golden tones of evoking a sunset or golden hour glow. The background is minimalist and slightly textured; the expression on her face is moody, calm, yet happy and introspective.",
        tag: "Filmy",
        aiTool: "Gemini",
        proTip: "Golden-hour warmth + film grain for 90s vibe.",
        imageUrl: "/prompt6.png",
        createdAt: new Date(now.getTime() - 1000 * 60 * 7).toISOString(),
        updatedAt: new Date(now.getTime() - 1000 * 60 * 7).toISOString(),
    },
    {
        id: "p10",
        prompt: "Please draw an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition — just like a random snapshot taken casually. The photo should include slight motion blur, with uneven lighting caused by sunlight or indoor lights resulting in mild overexposure. The angle is awkward, the composition is messy, and the overall aesthetic is deliberately plain — as if it was accidentally taken while pulling the phone out of a pocket. The subjects are [Names], taken at night, next to the [Location]",
        tag: "Viral",
        aiTool: "Gemini",
        proTip: "Focus on authentic, imperfect selfie aesthetics.",
        imageUrl: "/prompt7.png",
        createdAt: new Date(now.getTime() - 1000 * 60 * 6).toISOString(),
        updatedAt: new Date(now.getTime() - 1000 * 60 * 6).toISOString(),
    },
    {
        id: "p11",
        prompt: "Making a playful peace sign with both hands and winking. Tearful eyes and slightly trembling lips, showing a cute crying expression. Arms wide open in a warm, enthusiastic hug pose. Lying on their side asleep, resting on a tiny pillow with a sweet smile. Pointing forward with confidence, surrounded by shining visual effects. Blowing a kiss, with heart symbols floating around. Maintain the chibi aesthetic. Exaggerated, expressive big eyes. Soft facial lines. Background: Vibrant red with star or colorful confetti elements for decoration. Leave some clean white space around each sticker. Aspect ratio: 9:16",
        tag: "Anime",
        aiTool: "Gemini",
        proTip: "Use 9:16 aspect ratio for sticker format.",
        imageUrl: "/prompt8.png",
        createdAt: new Date(now.getTime() - 1000 * 60 * 5).toISOString(),
        updatedAt: new Date(now.getTime() - 1000 * 60 * 5).toISOString(),
    },
    {
        id: "p12",
        prompt: "Combine multiple images ([Image1], [Image2], [Image3], …) into a single cohesive image. Keep all key subjects recognizable and maintain their proportions and details. Blend the images naturally with consistent lighting, shadows, perspective, and style. Photorealistic, high-resolution, seamless integration.",
        tag: "Viral",
        aiTool: "Gemini",
        proTip: "Ensure consistent lighting and perspective across all subjects.",
        imageUrl: "/prompt9.png",
        createdAt: new Date(now.getTime() - 1000 * 60 * 4).toISOString(),
        updatedAt: new Date(now.getTime() - 1000 * 60 * 4).toISOString(),
    }
];


