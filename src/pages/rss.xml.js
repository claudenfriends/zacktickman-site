import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const findings = (await getCollection('findings')).sort(
    (a, b) => b.data.published.valueOf() - a.data.published.valueOf()
  );
  return rss({
    title: 'Zack Tickman — Findings',
    description: 'Original security research, published after coordinated disclosure.',
    site: context.site,
    items: findings.map((f) => ({
      title: f.data.title,
      description: f.data.dek,
      pubDate: f.data.published,
      link: `/findings/${f.id}/`,
    })),
  });
}
