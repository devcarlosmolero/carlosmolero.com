import { LoaderFunction } from '@remix-run/cloudflare'
import { getLatestPosts } from '~/actions/contentful'
import { STATIC_PATHS } from '~/consts'

export const loader: LoaderFunction = async () => {
    const posts = await getLatestPosts(100)
    const entries = posts.map((post) => ({
        slug: post.slug!,
        updatedAt: post.updatedAt!,
    }))

    return new Response(renderXML(entries), {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'x-content-type-options': 'nosniff',
            'Cache-Control': `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
        },
    })
}

const renderXML = (entries: { slug: string; updatedAt: string }[]) => {
    const url = 'https://novascript.io'

    const sourceXML = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${entries.map(
        (entry) => `<url>
      <loc>${url}/${entry.slug}</loc>
      <lastmod>${entry.updatedAt}</lastmod>
    </url>`
    )}
    ${STATIC_PATHS.map(
        (path) => `<url>
      <loc>${url}/${path}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>`
    )}
  </urlset>`

    return sourceXML
}
