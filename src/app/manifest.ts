import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Neural Hub - Subhan',
        short_name: 'Neural Hub',
        description: 'Personal hub for browser extensions, tactical intelligence, and web architecture.',
        start_url: '/',
        display: 'standalone',
        background_color: '#030303',
        theme_color: '#030303',
        icons: [
            {
                src: '/icon.svg',
                sizes: 'any',
                type: 'image/svg+xml',
            },
        ],
    };
}
