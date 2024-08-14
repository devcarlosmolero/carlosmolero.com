import { MetaFunction } from '@remix-run/cloudflare'
import { Fragment, useEffect, useState } from 'react'
import Checkbox from '~/components/atoms/Checkbox'
import Spinner from '~/components/molecules/Spinner'
import SectionHeading from '~/components/pages/Home/SectionHeading'
import Page from '~/components/templates/Page'
import { IMAGE_KIT_BASE_URL } from '~/consts'
import { getBasicMetas, getBusinessJsonLd, getHowToJsonLd } from '~/utils/metas'

const initialChecklist = [
    {
        recommendation:
            'Comprimir y servir imágenes y contenido multimedia en un formato moderno',
        description: `Comprime las imágenes y utiliza formatos de extensión modernos como WEBP. Si estás utilizando WordPress te recomendamos 
<a class="underline decoration-gray-500 decoration-dashed underline-offset-4 hover:text-violet-300" target="_blank" href="https://es.wordpress.org/plugins/wp-smushit/">Smush</a> y 
<a class="underline decoration-gray-500 decoration-dashed underline-offset-4 hover:text-violet-300" target="_blank" href="https://shortpixel.com/">ShortPixel</a>.`,
        checked: false,
    },
    {
        recommendation: 'Minificar y combinar archivos JavaScript y CSS',
        description: `Combina y reduce el tamaño de múltiples archivos CSS o JavaScript en uno solo para reducir el número de solicitudes HTTP. Si estás usando WordPress te recomendamos utilizar el plugin 
<a class="underline decoration-gray-500 decoration-dashed underline-offset-4 hover:text-violet-300" target="_blank" href="https://es.wordpress.org/plugins/wp-optimize/">WPOptimize</a>.`,
        checked: false,
    },
    {
        recommendation: 'Usar un CDN (Red de Entrega de Contenidos)',
        description: `Distribuye el contenido de tu web a través de una red global de servidores para que los usuarios se conecten al servidor más cercano.
Puedes usar <a class="underline decoration-gray-500 decoration-dashed underline-offset-4 hover:text-violet-300" target="_blank" href="https://www.cloudflare.com/es-es/what-is-cloudflare/">Cloudflare</a> para este propósito.
Aquí tienes una <a class="underline decoration-gray-500 decoration-dashed underline-offset-4 hover:text-violet-300" target="_blank" href="https://www.cloudflare.com/es-es/integrations/wordpress/">guía de integración con WordPress</a>.`,
        checked: false,
    },
    {
        recommendation: 'Habilitar la compresión GZIP',
        description: `La compresión GZIP permite que los archivos se compriman en el servidor web antes de enviarlos al usuario. Plugins para WordPress como 
<a class="underline decoration-gray-500 decoration-dashed underline-offset-4 hover:text-violet-300" target="_blank" href="https://es.wordpress.org/plugins/wp-optimize/">WPOptimize</a> permiten habilitar esta opción.`,
        checked: false,
    },
    {
        recommendation: 'Implementar caching',
        description: `Cachear consiste en guardar una copia de un conjunto de datos, que puedes haber obtenido de tu base de datos o de un servicio de terceros, 
durante un tiempo limitado en un almacén de rápido acceso para no tener que estar consultando la fuente original constantemente. Si usas WordPress, el plugin 
<a class="underline decoration-gray-500 decoration-dashed underline-offset-4 hover:text-violet-300" target="_blank" href="https://es.wordpress.org/plugins/litespeed-cache/">LiteSpeed Cache</a> te será de ayuda`,
        checked: false,
    },
    {
        recommendation:
            "Limitar el número de fuentes y usar la propiedad 'swap'",
        description: `Evita utilizar más de 2 fuentes en tu sitio web y asegúrate de que se cargan con la propiedad CSS swap para
mejorar su velocidad de carga. La propiedad swap se asegura de que el navegador renderice el texto aunque la fuente no esté cargada
y lo cambie cuando esta termine de cargar, se trata de evitar que el usuario vea la página sin texto y de que la fuente cargue en segundo 
plano.`,
        checked: false,
    },
    {
        recommendation: 'Mantener la estructura del DOM lo más limpia posible',
        description: `Tanto si tu web se ha hecho con código como si estás usando un CMS, el tamaño y el nivel de profundidad del DOM es fundamental
para mejorar la velocidad de carga. Procura tener una estructura HTML lo más limpia posible. En WordPress, Elementor hace un excelente trabajo aunque
está lejos de ser perfecto.`,
        checked: false,
    },
    {
        recommendation: 'Asegurarte de estar usando HTTP/2',
        description:
            'HTTP/2 permite la ejecución de varias solicitudes simultáneas sobre una misma conexión.',
        checked: false,
    },
    {
        recommendation: "Utilizar la carga de contenido 'lazy' o 'lazy load'",
        description: `La carga 'lazy' es una práctica común y fundamental en el desarrollo de páginas web. Consiste en cargar imágenes y vídeos solo 
cuando el usuario está a punto de verlos en su pantalla. Si usas WordPress tienes a tu disposición plugins como 
<a class="underline decoration-gray-500 decoration-dashed underline-offset-4 hover:text-violet-300" target="_blank" href="https://es.wordpress.org/plugins/rocket-lazy-load/">LazyLoad Plugin</a>.`,
        checked: false,
    },
    {
        recommendation: 'Optimizar el tiempo de respuesta del servidor',
        description: `En WordPress, optimizar el tiempo de respuesta del servidor es cuestión de reducir la cantidad de plugins y recursos multimedia alojados así como de 
usar un tema ligero. Si tu web está hecha con código, deberás revisar la cantidad de solicitudes que se realizan para obtener datos dinámicamente y valorar cuáles puedes 
hacer de forma simultánea.`,
        checked: false,
    },
]

export const meta: MetaFunction = () => {
    return [
        ...getBasicMetas({
            title: '✅ Checklist Velocidad Página Web',
            description: `Completa esta lista de tareas y te garantizamos que la velocidad de tu sitio web se incrementará con creces. Obtén consejos y recomendaciones para mejorar 
tu página web y hacer que cargue más rápido.`,
            img: `${IMAGE_KIT_BASE_URL}/tr:f-webp/meta.png`,
            appendSiteName: false,
        }),
        {
            'script:ld+json': [
                getBusinessJsonLd(),
                getHowToJsonLd({
                    name: '¿Cómo aumentar la velocidad de mi página web?',
                    description: `Completa esta lista de tareas y te garantizamos que la velocidad de tu sitio web se incrementará con creces. Obtén consejos y recomendaciones para mejorar 
        tu página web y hacer que cargue más rápido`,
                    steps: initialChecklist.map((item) => ({
                        name: item.recommendation,
                        text: item.description
                            .replace(/<[^>]*>/g, '')
                            .replace(/\n/g, ''),
                    })),
                }),
            ],
        },
    ]
}

export default function ChecklistOptimizacionVelocidadWebPage() {
    const [checklist, setChecklist] = useState<any>()

    useEffect(() => {
        const data = localStorage.getItem('web_speed_optimization_checklist')
        if (data) {
            setChecklist(JSON.parse(data))
            return
        }

        setChecklist(initialChecklist)
    }, [])

    function handleCheck(item: (typeof checklist)[0], checked: boolean) {
        const newChecklist = checklist.map((item2: any) => {
            if (item2.recommendation === item.recommendation) {
                return {
                    ...item2,
                    checked,
                }
            }
            return item2
        })

        setChecklist(newChecklist)
        localStorage.setItem(
            'web_speed_optimization_checklist',
            JSON.stringify(newChecklist)
        )
    }

    return (
        <Page>
            <div className="flex flex-col">
                <SectionHeading
                    title="Lista de tareas para optimizar la velocidad de tu página web"
                    description="Sigue estas recomendaciones para optimizar la velocidad de tu página web. Marca como completadas las tareas a medida que las realices, no te preocupes seguirán marcadas cuando vuelvas."
                />
                <div className="flex flex-col gap-y-3">
                    {checklist && checklist.length > 0 ? (
                        <Fragment>
                            {checklist.map((item: any, index: number) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-y-2"
                                >
                                    <Checkbox
                                        labelProps={{
                                            text: `${index + 1}. ${item.recommendation}`,
                                        }}
                                        checkboxProps={{
                                            useStrike: true,
                                            defaultChecked: item.checked,
                                            onCheckedChange: (checked) =>
                                                handleCheck(
                                                    item,
                                                    checked as boolean
                                                ),
                                        }}
                                    />
                                    {!item.checked && (
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: item.description,
                                            }}
                                            className="text-sm text-gray-400"
                                        ></p>
                                    )}
                                </div>
                            ))}
                        </Fragment>
                    ) : (
                        <Spinner className="!size-12" />
                    )}
                </div>
            </div>
        </Page>
    )
}
