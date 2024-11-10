import { LoaderFunction } from '@remix-run/cloudflare'
import Posts from '~/actions/posts'
import Services from '~/actions/services'
import { SITE_BASE_URL, SITE_STATIC_PATHS } from '~/consts'
import { Post, Service } from '~/types/contentful'
import { getCacheControlHeader } from '~/utils/server'

export const loader: LoaderFunction = async () => {
    const [posts, services] = await Promise.all([
        Posts.latest(100).get() as Promise<Post[]>,
        Services.all().get() as Promise<Service[]>,
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
