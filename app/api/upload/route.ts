import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request: NextRequest) {
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
        console.error('Missing Cloudinary credentials');
        return NextResponse.json(
            { error: 'Server configuration error' },
            { status: 500 }
        );
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No file uploaded' },
                { status: 400 }
            );
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary with proper error handling
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'image',
                    folder: 'promptvault',
                    format: 'jpg', // Convert all images to jpg
                    transformation: [
                        { quality: 'auto:good' }, // Automatic quality optimization
                        { fetch_format: 'auto' }, // Automatic format selection based on client
                    ],
                },
                (error, result) => {
                    if (error) {
                        console.error('Cloudinary upload error:', error);
                        reject(error);
                        return;
                    }
                    resolve(result);
                }
            );

            // Handle upload stream errors
            uploadStream.on('error', (error) => {
                console.error('Upload stream error:', error);
                reject(error);
            });

            uploadStream.end(buffer);
        });

        console.log('Cloudinary upload successful:', result);
        return NextResponse.json({
            url: (result as { secure_url: string }).secure_url,
            success: true
        });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Error uploading file', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}