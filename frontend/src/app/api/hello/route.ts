import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
    try {
        const session: any = await getServerSession(authOptions);
        const token = session?.id_token;

        const headers: HeadersInit = {
            'cache': 'no-store',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        // In Docker, 'backend' resolves to the FastAPI container's IP
        const response = await fetch('http://backend:8000/', {
            headers,
            cache: 'no-store',
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return NextResponse.json(
                { error: errorData.detail || 'Failed to fetch from backend' },
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
