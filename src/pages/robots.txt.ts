import type { APIRoute } from 'astro';
import { sitePath } from '../lib/site';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(sitePath('/sitemap-index.xml'), site).href;
  const body = `User-agent: *\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: GPTBot\nAllow: /\n\nSitemap: ${sitemap}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
