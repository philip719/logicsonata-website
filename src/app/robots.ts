import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export const dynamic = 'force-static';

// AI assistants and answer engines are explicitly welcome to read and cite the site.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
  'CCBot',
  'meta-externalagent',
];

export default function robots(): MetadataRoute.Robots {
  return {
    // Whitepaper PDFs are reached through their sign-up pages, not search results.
    rules: [{ userAgent: '*', allow: '/', disallow: ['/whitepapers/files/', '/api/'] }, ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/', disallow: ['/whitepapers/files/', '/api/'] }))],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
