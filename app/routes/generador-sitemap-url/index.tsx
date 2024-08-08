import Page from '~/components/templates/Page'
import { load } from 'cheerio'
import {
    Form,
    MetaFunction,
    useActionData,
    useNavigate,
} from '@remix-run/react'
import SectionHeading from '~/components/pages/Home/SectionHeading'
import Input from '~/components/atoms/Input'
import Button from '~/components/atoms/Button'
import { ActionFunctionArgs, json } from '@remix-run/cloudflare'
import 'highlight.js/styles/monokai.css'
import Highlight from 'react-highlight'
import { ArrowClockwise, Copy } from 'react-bootstrap-icons'
import { toast } from 'react-toastify'
import { redirectWithToast } from '~/utils/server'
import { useEffect, useState } from 'react'
import Accordion from '~/components/organisms/Accordion'
import { IMAGE_KIT_BASE_URL } from '~/consts'
import { getBasicMetas, getBusinessJsonLd, getFaqsJsonLd } from '~/utils/metas'

const faqs = [
    {
        question: '¿Qué es un sitemap?',
        answer: 'Un sitemap es un archivo que proporciona información sobre las páginas, videos y otros archivos de un sitio web, así como las relaciones entre ellos. Los sitemaps ayudan a los motores de búsqueda a rastrear y indexar el contenido del sitio web de manera más eficiente.',
    },
    {
        question: '¿Por qué es importante tener un sitemap?',
        answer: 'Tener un sitemap es importante porque facilita a los motores de búsqueda la tarea de encontrar e indexar todas las páginas importantes de un sitio web. Esto es especialmente útil para sitios con una estructura compleja o con muchas páginas que podrían no ser fácilmente accesibles desde la navegación estándar.',
    },
    {
        question: '¿Qué tipos de sitemaps existen?',
        answer: 'Existen principalmente dos tipos de sitemaps: el sitemap XML, que está diseñado para motores de búsqueda y proporciona información técnica sobre el contenido del sitio, y el sitemap HTML, que está destinado a los usuarios y proporciona una estructura navegable del sitio para facilitar el acceso a diferentes secciones.',
    },
    {
        question: '¿Cómo se crea un sitemap?',
        answer: 'Un sitemap se puede crear manualmente o mediante herramientas automáticas. Para un sitemap XML, puedes usar herramientas en línea, plugins para sistemas de gestión de contenidos como WordPress, o escribir un script que genere el archivo XML basado en la estructura del sitio. Para un sitemap HTML, puedes crear una página en tu sitio web que liste todas las secciones y enlaces importantes.',
    },
    {
        question: '¿Cómo se envía un sitemap a los motores de búsqueda?',
        answer: 'Para enviar un sitemap a los motores de búsqueda, debes utilizar las herramientas para webmasters proporcionadas por los motores de búsqueda, como Google Search Console o Bing Webmaster Tools. Simplemente sube el archivo del sitemap o proporciona la URL del sitemap para que el motor de búsqueda lo rastree e indexe.',
    },
]

export const meta: MetaFunction = () => {
    return [
        ...getBasicMetas({
            title: '⚙️ Generador de Sitemap XML Automático',
            description: `Crea un sitemap para tu sitio web a partir de la url, de forma 100% automática y gratuita. Nuestro generador de sitemap encontrará todas las urls relevantes de tu sitio web y te ayudará a indexarlas más rápido.`,
            img: `${IMAGE_KIT_BASE_URL}/tr:f-webp/meta.png`,
            appendSiteName: true,
        }),
        {
            'script:ld+json': [getBusinessJsonLd(), getFaqsJsonLd(faqs)],
        },
    ]
}

const visited: Set<string> = new Set()
const urls: Set<string> = new Set()

function getSitemapFromUrls(urls: string[]): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
      .map(
          (url) => `<url>
      <loc>${url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>`
      )
      .join('')}
</urlset>`
}

async function crawl(url: string, depth: number = 0) {
    if (visited.has(url) || depth > 3) return
    const domain = new URL(url).hostname
    visited.add(url)

    const response = await fetch(url)
    const html = await response.text()
    const $ = load(html)

    const newUrls: string[] = []
    $('a:not([target="_blank"])').each((_, element) => {
        let href = $(element).attr('href')
        if (href && !href.includes('#')) {
            if (href.startsWith('/')) {
                href = new URL(href, url).toString()
            }
            if (href.includes(domain) && !visited.has(href)) {
                newUrls.push(href)
                visited.add(href) // Marcar como visitada
            }
        }
    })

    newUrls.forEach((href) => urls.add(href))
    for (const newUrl of newUrls) {
        await crawl(newUrl, depth + 1)
    }
}

export async function action({ request }: ActionFunctionArgs) {
    try {
        const formData = await request.formData()
        const url = formData.get('url')

        urls.clear()
        visited.clear()

        if (url) {
            await crawl(url.toString(), 1)
            return json({
                urls: Array.from(urls),
                sitemap: getSitemapFromUrls(Array.from(urls)),
                error: null,
            })
        }

        return json({ urls: [], sitemap: '', error: null })
    } catch (e) {
        return json({ urls: [], sitemap: '', error: (e as Error).message })
    }
}

export default function GeneradorSitemapUrl() {
    const data = useActionData<typeof action>()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(false)
        if (data?.error) {
            toast.error(
                `Ha ocurrido un error: ${data.error}. Inténtalo de nuevo más tarde.`
            )
        }
    }, [data])

    return (
        <Page>
            <div className="flex flex-col">
                <SectionHeading
                    title="Creador de sitemaps para páginas web a partir de URL"
                    description="Utiliza nuestra herramienta 100% gratuita para generar un sitemap de tu sitio web a partir de su url."
                />
                <div className="flex items-center justify-center">
                    {data && data.urls.length > 0 ? (
                        <div className="flex w-full flex-col gap-y-3">
                            <div className="flex gap-x-3">
                                <Button
                                    props={{ onClick: () => navigate('.') }}
                                    variant="ghost"
                                    hasIcon
                                >
                                    Volver <ArrowClockwise />
                                </Button>
                                <Button
                                    props={{
                                        onClick: async () => {
                                            await navigator.clipboard.writeText(
                                                data.sitemap
                                            )
                                            toast.success(
                                                'El sitemap se ha copiado con éxito.'
                                            )
                                        },
                                    }}
                                    variant="primary"
                                    hasIcon
                                >
                                    Copiar <Copy />
                                </Button>
                            </div>
                            <Highlight className="xml w-full rounded-xl">
                                {data.sitemap}
                            </Highlight>
                        </div>
                    ) : (
                        <Form
                            onSubmit={() => setIsLoading(true)}
                            className="w-full max-w-[600px]"
                            action="/generador-sitemap-url"
                            method="POST"
                        >
                            <Input
                                labelProps={{
                                    text: 'Url raíz de tu sitio web',
                                }}
                                inputProps={{
                                    type: 'url',
                                    disabled: isLoading,
                                    required: true,
                                    placeholder:
                                        'Ejemplo: https://novascript.io',
                                    name: 'url',
                                }}
                            />
                            <div className="my-5 flex justify-center">
                                <Button
                                    isLoading={isLoading}
                                    className="min-w-[150px]"
                                    props={{ type: 'submit' }}
                                    variant={isLoading ? 'ghost' : 'accent'}
                                >
                                    Crear Sitemap
                                </Button>
                            </div>
                        </Form>
                    )}
                </div>
            </div>
            <div>
                <SectionHeading
                    title="Preguntas y respuestas sobre sitemaps"
                    description="¿Quieres saber un poco más acerca de para qué sirve el sitemap en un sitio web? Contestamos las preguntas que pueden estar rondándote la cabeza ahora mismo."
                />
                <Accordion data={faqs} />
            </div>
        </Page>
    )
}
