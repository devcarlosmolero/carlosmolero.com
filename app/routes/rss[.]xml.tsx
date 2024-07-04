import { LoaderFunction } from '@remix-run/cloudflare'
import { getLatestPosts } from '~/actions/contentful'
import { Post } from '~/types/contentful'

export const loader: LoaderFunction = async () => {
    const posts = await getLatestPosts(100, [
        'sys',
        'fields.slug',
        'fields.seoTitle',
        'fields.seoDescription',
    ])

    return new Response(renderXML(posts), {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'x-content-type-options': 'nosniff',
            'Cache-Control': `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
        },
    })
}

const renderXML = (entries: Post[]): string => {
    return `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>Desarrollo de Software y Diseño Web - NovaScript</title>
      <description>
        Optimiza tu PYME/Startup con software a medida: desarrollo de apps web, iOS y Android, producto mínimo viable, cloud, diseño web, y más soluciones tecnológicas.
      </description>
      <link>https://novascript.io</link>
      <language>es</language>
      <ttl>60</ttl>
      <atom:link href="https://novascript.io/rss.xml" rel="self" type="application/rss+xml" />
      ${entries
          .map(
              (entry) => `
        <item>
          <title><![CDATA[${entry.seoTitle}]]></title>
          <description><![CDATA[${entry.seoDescription}]]></description>
          <pubDate>${entry.createdAt}</pubDate>
          <link>https://novascript.io/${entry.slug}</link>
        </item>`
          )
          .join('')}
    </channel>
  </rss>`
}
