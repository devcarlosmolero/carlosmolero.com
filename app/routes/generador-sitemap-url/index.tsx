import Page from '~/components/templates/Page'
import { load } from 'cheerio'
import { useLoaderData } from '@remix-run/react'

const visited = new Set()
const urls = new Set()

async function crawl(url: string, depth: number = 0) {
    if (visited.has(url) || depth > 3) return // Limitar la profundidad de rastreo a 3 niveles
    const domain = new URL(url).hostname
    visited.add(url)

    try {
        const response = await fetch(url)
        const html = await response.text()
        const $ = load(html)

        const newUrls = []
        $('a:not([target="_blank"])').each((_, element) => {
            let href = $(element).attr('href')
            if (href && !href.includes('#')) {
                if (href.startsWith('/')) {
                    href = new URL(href, url).toString() // Convierte URLs relativas a absolutas
                }
                if (href.includes(domain) && !visited.has(href)) {
                    newUrls.push(href)
                    visited.add(href) // Marcar como visitada
                }
            }
        })

        newUrls.forEach((href) => urls.add(href)) // Agrega nuevas URLs al conjunto
        for (const newUrl of newUrls) {
            await crawl(newUrl, depth + 1) // Rastrear recursivamente con profundidad incrementada
        }
    } catch (error) {
        console.error(`Error al rastrear ${url}:`, error)
    }
}

export async function loader() {
    visited.clear()
    urls.clear()
    await crawl('https://novascript.io')
    return { urls: Array.from(urls) } // Convertir el conjunto a un array
}

export default function GeneradorSitemapUrl() {
    const { urls } = useLoaderData<typeof loader>()
    console.log(urls)

    return (
        <Page>
            <div>
                <h1>Generador de Sitemap</h1>
                <ul>
                    {urls.map((url, index) => (
                        <li key={index}>{url}</li>
                    ))}
                </ul>
            </div>
        </Page>
    )
}
