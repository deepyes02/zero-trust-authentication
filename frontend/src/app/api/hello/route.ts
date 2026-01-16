import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // In Docker, 'backend' resolves to the FastAPI container's IP
        const response = await fetch('http://backend:8000/', {
            cache: 'no-store',
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch from backend' },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Backend fetch error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
