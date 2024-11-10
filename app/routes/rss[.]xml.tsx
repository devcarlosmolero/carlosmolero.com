import { LoaderFunction } from '@remix-run/cloudflare'

import Posts from '~/actions/posts'
import {
    SITE_BASE_URL,
    SITE_DESCRIPTION,
    SITE_NAME,
    SITE_TITLE,
} from '~/consts'
import { Post } from '~/types/contentful'
import { getCacheControlHeader } from '~/utils/server'

export const loader: LoaderFunction = async () => {
    const posts = (await Posts.latest().get()) as Post[]

    return new Response(renderXML(posts), {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'x-content-type-options': 'nosniff',
            'Cache-Control': getCacheControlHeader('ONE_WEEK'),
        },
    })
}

const renderXML = (entries: Post[]): string => {
    return `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${SITE_TITLE} - ${SITE_NAME}</title>
      <description>${SITE_DESCRIPTION}</description>
      <link>${SITE_BASE_URL}</link>
      <language>es</language>
      <ttl>60</ttl>
      <atom:link href="${SITE_BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
      ${entries
          .map(
              (entry) => `
        <item>
          <title><![CDATA[${entry.seoTitle}]]></title>
          <description><![CDATA[${entry.seoDescription}]]></description>
          <pubDate>${entry.createdAt}</pubDate>
          <link>${SITE_BASE_URL}/${entry.slug}</link>
        </item>`
          )
          .join('')}
    </channel>
  </rss>`
}
