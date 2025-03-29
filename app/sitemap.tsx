import type { MetadataRoute } from 'next'
import { BASE_URL } from '@/libs/constants'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
        url: `${BASE_URL}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
    },
    {
        url: `${BASE_URL}bible`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
    },
    {
        url: `${BASE_URL}ai/chat`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
    },
    {
        url: `${BASE_URL}sermons`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
    },
  ]
}