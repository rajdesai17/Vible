'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';

interface ImageUploaderProps {
    onUploadSuccess: (url: string) => void;
    onRemove?: () => void;
}

export default function ImageUploader({ onUploadSuccess, onRemove }: ImageUploaderProps) {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     const selectedFile = e.target.files?.[0];
    //     if (selectedFile) {
    //         if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
    //             setError('File size must be less than 5MB');
    //             return;
    //         }
    //         setFile(selectedFile);
    //         setPreviewUrl(URL.createObjectURL(selectedFile));
    //         setError('');
    //     }
    // };
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.size > 5 * 1024 * 1024) {
                setError('File size must be less than 5MB');
                return;
            }
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            setError('');

            // Auto-upload immediately
            handleUpload(selectedFile);
        }
    };
    const handleUpload = async (fileToUpload: File) => {
        setIsUploading(true);
        setError('');

        const formData = new FormData();
        formData.append('file', fileToUpload);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Upload failed.');
            }

            const data = await response.json();
            onUploadSuccess(data.url);
            setFile(null);

        } catch (err: any) {
            setError(err.message || 'An error occurred during upload.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveImage = () => {
        setFile(null);
        setPreviewUrl('');
        setError('');
        if (onRemove) onRemove();
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        setIsUploading(true);
        setError('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Upload failed.');
            }

            const data = await response.json();
            onUploadSuccess(data.url);
            // Don't clear the preview immediately so user can see the uploaded image
            setFile(null);

        } catch (err: any) {
            setError(err.message || 'An error occurred during upload.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center relative">
                    {!previewUrl ? (
                        <>
                            <label
                                htmlFor="file-upload"
                                className="cursor-pointer flex flex-col items-center justify-center gap-2"
                            >
                                <div className="p-4 rounded-full bg-primary/10">
                                    <svg
                                        className="w-6 h-6 text-primary"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Click to upload or drag and drop
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-500">
                                    Images are auto uploaded once selected. Choose wisely!
                                </span>
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />
                        </>
                    ) : (
                        <div className="relative">
                            <div className="relative w-full aspect-video">
                                <Image
                                    src={previewUrl}
                                    alt="Preview"
                                    fill
                                    className="object-contain rounded-lg"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

                {error && (
                    <p className="text-sm text-red-500 mt-2">{error}</p>
                )}

                {file && !error && (
                    <Button
                        type="submit"
                        disabled={isUploading}
                        className="w-full"
                    >
                        {isUploading ? 'Uploading...' : 'Upload Image'}
                    </Button>
                )}
            </form>
        </div>
    );
};