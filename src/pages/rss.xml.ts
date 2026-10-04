import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { SITE_DESCRIPTION, SITE_NAME, sitePath } from '../lib/site';

export const GET: APIRoute = async (context) => {
  const articles = (await getCollection('articles', ({ data }) => !data.draft)).sort((a,b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
  return rss({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    site: context.site!,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.publishedAt,
      link: sitePath(`/articles/${article.data.slug}/`)
    })),
    customData: '<language>ja</language>'
  });
};
