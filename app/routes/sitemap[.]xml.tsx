import { LoaderFunction } from '@remix-run/cloudflare'
import { getLatestPosts, getServices } from '~/actions/contentful'
import { SITE_BASE_URL, SITE_STATIC_PATHS } from '~/consts'
import { getCacheControlHeader } from '~/utils/server'

export const loader: LoaderFunction = async () => {
    const [posts, services] = await Promise.all([
        getLatestPosts(10, ['sys', 'fields.slug']),
        getServices(10, ['sys', 'fields.slug']),
    ])

    const entries = [...posts, ...services].map((entry) => ({
        slug: entry.slug!,
        updatedAt: entry.updatedAt!,
    }))

    return new Response(renderXML(entries), {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'x-content-type-options': 'nosniff',
            'Cache-Control': getCacheControlHeader('ONE_WEEK'),
        },
    })
}

const renderXML = (entries: { slug: string; updatedAt: string }[]) => {
    const sourceXML = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${entries.map(
        (entry) => `<url>
      <loc>${SITE_BASE_URL}/${entry.slug}</loc>
      <lastmod>${entry.updatedAt}</lastmod>
    </url>`
    )}
    ${SITE_STATIC_PATHS.map(
        (path) => `<url>
      <loc>${SITE_BASE_URL}/${path}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>`
    )}
  </urlset>`

    return sourceXML
}
