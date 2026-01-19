import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://your-domain.com'

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/#main-content`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        // Add more pages as needed
        // {
        //   url: `${baseUrl}/projects`,
        //   lastModified: new Date(),
        //   changeFrequency: 'weekly',
        //   priority: 0.8,
        // },
    ]
}
