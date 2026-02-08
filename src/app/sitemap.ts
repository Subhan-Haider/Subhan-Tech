import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://subhan.tech';

    // Main Pages
    const mainPages = [
        '',
        '/about',
        '/projects',
        '/blog',
        '/contact',
        '/docs',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Documentation Pages
    const docPages = [
        '/docs/getting-started',
        '/docs/api',
        '/docs/extensions',
        '/docs/guides',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...mainPages, ...docPages];
}
