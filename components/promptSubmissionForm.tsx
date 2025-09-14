'use client';

import { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import ImageUploader from './ImageUploader';
import { tags, aiTools } from '@/lib/enum';

export default function PromptSubmissionForm() {
    const [prompt, setPrompt] = useState<string>('');
    const [tag, setTag] = useState<string>('');
    const [aiTool, setAiTool] = useState<string>('');
    const [proTip, setProTip] = useState<string>('');
    const [instagramHandle, setInstagramHandle] = useState<string>('');
    const [twitterHandle, setTwitterHandle] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>(''); // Stores the URL from ImageUploader
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitMessage, setSubmitMessage] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);

    const handleImageUploadSuccess = (url: string) => {
        setImageUrl(url);
        setSubmitMessage('Image uploaded successfully! Ready to submit form.');
        setIsError(false);
    };

    const formatSocialHandle = (handle: string, type: 'instagram' | 'twitter') => {
        // Remove @ if present and trim whitespace
        const cleanHandle = handle.replace('@', '').trim();
        return cleanHandle ? cleanHandle : null;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');
        setIsError(false);

        // Basic validation
        if (!prompt || !tag || !aiTool) {
            setSubmitMessage('Please fill in all required fields: Prompt, Tag, and AI Tool.');
            setIsError(true);
            setIsSubmitting(false);
            return;
        }

        // Format social handles
        const formattedInstagramHandle = formatSocialHandle(instagramHandle, 'instagram');
        const formattedTwitterHandle = formatSocialHandle(twitterHandle, 'twitter');

        try {
            const response = await fetch('/api/prompts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt,
                    tag,
                    aiTool,
                    proTip: proTip || null,
                    instagramHandle: formattedInstagramHandle,
                    twitterHandle: formattedTwitterHandle,
                    imageUrl: imageUrl || null,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to submit prompt.');
            }

            setSubmitMessage('Prompt submitted successfully! Thank you!');
            setIsError(false);
            // Optionally reset form fields
            setPrompt('');
            setTag('');
            setAiTool('');
            setProTip('');
            setInstagramHandle('');
            setTwitterHandle('');
            setImageUrl('');

        } catch (error: any) {
            setSubmitMessage(error.message || 'An unexpected error occurred.');
            setIsError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center py-6 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl p-8 space-y-8 bg-black border-4 border-white/20 rounded-lg shadow-xl"
                style={{ boxShadow: '0 0 15px rgba(255, 255, 255, 0.1)' }}> {/* Shiny border effect */}
                <h2 className="text-center text-3xl font-bold tracking-tight text-white">
                    Submit Your Visual Prompt
                </h2>
                <p className="text-center text-sm text-gray-400">
                    Share your creativity with the Vible community.
                </p>

                <form className="mt-5 space-y-6" onSubmit={handleSubmit}>
                    {/* Prompt */}
                    <div>
                        <Label htmlFor="prompt" className="text-white">Your Prompt</Label>
                        <Textarea
                            id="prompt"
                            name="prompt"
                            required
                            className="mt-1 block w-full bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500 shadow-sm sm:text-sm"
                            placeholder="e.g., A cyberpunk cityscape at sunset with neon reflections on wet streets..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            rows={5}
                        />
                    </div>

                    {/* Tags and AI Tool */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="tag" className="text-white">Category Tag</Label>
                            <Select value={tag} onValueChange={setTag} required>
                                <SelectTrigger className="w-full mt-1 bg-gray-900 border-gray-700 text-white">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 text-white border-gray-700">
                                    {tags.map((t) => (
                                        <SelectItem key={t} value={t}>{t}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="aiTool" className="text-white">AI Tool Used</Label>
                            <Select value={aiTool} onValueChange={setAiTool} required>
                                <SelectTrigger className="w-full mt-1 bg-gray-900 border-gray-700 text-white">
                                    <SelectValue placeholder="Select an AI tool" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 text-white border-gray-700">
                                    {aiTools.map((tool) => (
                                        <SelectItem key={tool} value={tool}>{tool}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Pro Tip */}
                    <div>
                        <Label htmlFor="proTip" className="text-white">Pro Tip / Instructions (Optional)</Label>
                        <Textarea
                            id="proTip"
                            name="proTip"
                            className="mt-1 block w-full bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500 shadow-sm sm:text-sm"
                            placeholder="e.g., Use a square aspect ratio. Start with a photo of a single person. etc."
                            value={proTip}
                            onChange={(e) => setProTip(e.target.value)}
                            rows={3}
                        />
                    </div>

                    {/* Social Handles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="instagramHandle" className="text-white">Instagram Handle (Optional)</Label>
                            <Input
                                id="instagramHandle"
                                name="instagramHandle"
                                type="text"
                                className="mt-1 block w-full bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500 shadow-sm sm:text-sm"
                                placeholder="Enter username without @"
                                value={instagramHandle}
                                onChange={(e) => setInstagramHandle(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="twitterHandle" className="text-white">Twitter/X Handle (Optional)</Label>
                            <Input
                                id="twitterHandle"
                                name="twitterHandle"
                                type="text"
                                className="mt-1 block w-full bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500 shadow-sm sm:text-sm"
                                placeholder="Enter username without @"
                                value={twitterHandle}
                                onChange={(e) => setTwitterHandle(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Image Uploader */}
                    <div className="pt-4">
                        <Label className="text-white block mb-2">Resulting Image (Optional)</Label>
                        <ImageUploader onUploadSuccess={handleImageUploadSuccess} />
                        {imageUrl && (
                            <div className="mt-4 text-center">
                                <p className="text-gray-400">Uploaded Image Preview:</p>
                                <img src={imageUrl} alt="Uploaded Result" className="mt-2 mx-auto max-w-full h-auto rounded-md shadow-lg" style={{ maxWidth: '300px' }} />
                            </div>
                        )}
                    </div>

                    {/* Submit Message */}
                    {submitMessage && (
                        <p className={`text-center text-sm ${isError ? 'text-red-500' : 'text-green-500'}`}>
                            {submitMessage}
                        </p>
                    )}

                    {/* Submit Button */}
                    <div>
                        <Button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Prompt'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}