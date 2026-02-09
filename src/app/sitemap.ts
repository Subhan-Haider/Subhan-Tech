import { MetadataRoute } from 'next';
import { productService } from '@/lib/services/products';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const products = await productService.getAll();
    const baseUrl = "https://subhan.tech";

    const productUrls = products.map((p) => ({
        url: `${baseUrl}/products/${p.id}`,
        lastModified: new Date(p.lastUpdated || p.createdAt || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const staticUrls = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/admin`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.3,
        }
    ];

    return [...staticUrls, ...productUrls];
}
