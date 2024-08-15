import { GlobeAltIcon } from '@heroicons/react/24/outline'
import { MetaFunction } from '@remix-run/cloudflare'
import { useState } from 'react'
import Input from '~/components/atoms/Input'
import Textarea from '~/components/atoms/Textarea'
import Accordion from '~/components/organisms/Accordion'
import SectionHeading from '~/components/pages/Home/SectionHeading'
import Page from '~/components/templates/Page'
import { getBasicMetas, getFaqsJsonLd } from '~/utils/metas'

const faqs = [
    {
        question: '¿Qué son las SERPs?',
        answer: 'Las SERPs son los resultados que aparecen en las páginas de buscadores como Google, Bing o Yahoo. Las siglas proceden del término en inglés Search Engine Results Pages, que en español sería “las páginas de resultados de búsqueda.”',
    },
    {
        question: '¿Qué tipos de SERPs hay?',
        answer: 'A pesar de que se pueda pensar que solo hay un tipo de SERP, ni mucho menos. Tenemos la gran división entre el SEO (Search Engine Optimization) y el SEM (Search Engine Marketing) escenificada en dos tipos de SERPs: los resultados orgánicos y los resultados pagados.',
    },
    {
        question: '¿Qué tipos de resultados aparecen en las SERPs?',
        answer: 'En las SERPs pueden aparecer todo tipo de resultados, no solo páginas web: Vídeos, Imágenes, Noticias, Mapas, Productos con imágenes, Podcasts y un largo etc.',
    },
]

export const meta: MetaFunction = () => {
    return [
        ...getBasicMetas({
            title: '⚙️ Contador de Caracteres SEO | Vista Previa SERP',
            description: `Previsualiza cómo se verán tus títulos y descripciones SEO en Google. Utiliza nuestra herramienta 100% gratuita 
de visualización SERP para dar con títulos y descripciones con el número de caracteres adecuado.`,
        }),
        {
            'script:ld+json': [getFaqsJsonLd(faqs)],
        },
    ]
}

export default function ContadorCaracteresSEOPage() {
    const [seoTitle, setSeoTitle] = useState<string | undefined>()
    const [seoDescription, setSeoDescription] = useState<string | undefined>()
    const [url, setUrl] = useState<string | undefined>()

    return (
        <Page>
            <div className="flex flex-col">
                <SectionHeading
                    asH1
                    title="Previsualiza cómo se verán tus títulos y descripciones SEO en Google"
                    description="Utiliza nuestra herramienta 100% gratuita de visualización SERP para dar con títulos y descripciones con el número de carácteres adecuado."
                />
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                    <div className="flex flex-col gap-y-5">
                        <p className="rounded-xl bg-neutral-800 px-2 py-3 text-white">
                            💡 Edita los campos para ver los cambios
                        </p>
                        <Input
                            labelProps={{ text: 'Url' }}
                            inputProps={{
                                type: 'url',
                                value: url,
                                onChange: (e) => setUrl(e.target.value),
                                placeholder: 'URL a tu sitio web',
                            }}
                        />
                        <span className="-mt-2 w-full text-end text-xs text-gray-400">
                            {url?.length || 0}/50
                        </span>
                        <Input
                            labelProps={{ text: 'Título SEO' }}
                            inputProps={{
                                value: seoTitle,
                                onChange: (e) => setSeoTitle(e.target.value),
                                placeholder: 'Título SEO',
                            }}
                        />
                        <span className="-mt-2 w-full text-end text-xs text-gray-400">
                            {seoTitle?.length || 0}/67
                        </span>
                        <Textarea
                            labelProps={{ text: 'Descripción SEO' }}
                            inputProps={{
                                value: seoDescription,
                                onChange: (e) =>
                                    setSeoDescription(e.target.value),
                                placeholder: 'Descripción SEO',
                            }}
                        />
                        <span className="-mt-2 w-full text-end text-xs text-gray-400">
                            {seoDescription?.length || 0}/155
                        </span>
                    </div>
                    <div className="h-fit rounded-xl bg-[#1f1f1f] p-5 shadow-zinc-700">
                        <div>
                            <div className="flex gap-x-2">
                                <div className="flex items-center">
                                    <GlobeAltIcon className="size-5" />
                                </div>
                                <div className="flex flex-col">
                                    <p className="mb-1 text-xs text-[#dadce0]">
                                        {url
                                            ? url
                                                  .replace('http:', '')
                                                  .replace('www.', '')
                                                  .replace('https:', '')
                                                  .replace('//', '')
                                            : 'novascript.io'}
                                    </p>
                                    <p className="mb-1 text-xs text-[#bdc1c6]">
                                        {url || 'https://novascript.io'}
                                    </p>
                                </div>
                            </div>
                            <h2 className="cursor-pointer text-xl text-[#99c3ff] underline-offset-4 hover:underline">
                                {seoTitle && seoTitle.length > 58
                                    ? seoTitle.substring(0, 58) + '...'
                                    : seoTitle ||
                                      'Empresa de Software y Diseño Web - NovaScript'}
                            </h2>
                            <p className="mt-1 text-sm text-[#bdc1c6]">
                                {seoDescription && seoDescription.length > 124
                                    ? seoDescription.substring(0, 124) + '...'
                                    : seoDescription ||
                                      'Nos dedicamos a desarrollar software a medida, crear apps móviles, diseñar y posicionar webs y mucho más ;)'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <SectionHeading
                    title="Preguntas y respuestas sobre las SERPs"
                    description="Si no sabes muy bien qué hace esta herramienta ¡No te preocupes! Despejamos todas tus dudas acerca de los que son las SERPs y por qué son importantes."
                />
                <Accordion data={faqs} />
            </div>
        </Page>
    )
}
