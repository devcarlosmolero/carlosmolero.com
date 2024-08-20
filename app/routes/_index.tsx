import 'animate.css/animate.compat.css'

import { json, type MetaFunction } from '@remix-run/cloudflare'
import Page from '~/components/templates/Page'
import Faq from '~/components/pages/Home/Faq'
import Hero from '~/components/pages/Home/Hero'
import OurProcess from '~/components/pages/Home/OurProcess'
import Services from '~/components/pages/Home/Services'
import Contact from '~/components/pages/shared/Contact'
import {
    SITE_BASE_URL,
    SITE_DESCRIPTION,
    SITE_NAME,
    SITE_TITLE,
} from '~/consts'
import { getLatestPosts, getServices } from '~/actions/contentful'
import Blog from '~/components/pages/Home/Blog'
import { useLoaderData } from '@remix-run/react'
import ScrollAnimation from 'react-animate-on-scroll'
import {
    getBasicMetas,
    getBreadcrumbJsonLd,
    getBusinessJsonLd,
    getFaqsJsonLd,
} from '~/utils/metas'
import { ServiceCard } from '~/types/contentful'
import { fromServiceCardToBreadCrumbJsonLdItem } from '~/utils/mappers'
import { getCacheControlHeader } from '~/utils/server'

export async function loader() {
    const posts = await getLatestPosts(6, [
        'fields.seoTitle',
        'fields.seoDescription',
        'fields.headerImg',
        'fields.slug',
        'sys',
    ])

    const serviceCards = await getServices(10, [
        'fields.cardTitle',
        'fields.cardDescription',
        'fields.enabled',
        'fields.slug',
        'fields.iconString',
        'sys',
    ])

    return json(
        {
            posts,
            serviceCards: serviceCards.sort((a, b) =>
                a === b ? 0 : a ? -1 : 1
            ),
        },
        {
            headers: {
                'Cache-Control': getCacheControlHeader('ONE_WEEK'),
            },
        }
    )
}

const faqs = [
    {
        question:
            '¿Qué tipos de proyectos de software desarrolláis en NovaScript?',
        answer: `Desarrollamos todo tipo de software, desde sitios web hasta aplicaciones móviles y software empresarial especializado para PYMES y Startups.
La amplia experiencia de nuestro equipo multidisciplinar, con múltiples tecnologías y lenguajes de programación, nos permite afrontar cualquier
reto que enfrente tu negocio.`,
    },
    {
        question:
            '¿Qué os diferencia de un equipo de desarrollo de software en plantilla?',
        answer: `La principal diferencia es que con nosotros te vas a ahorrar quebraderos de cabeza. 
Seguimos un modelo de contratación basado en el desarrollo de software como servicio, mediante una suscripción 
mensual o anual puedes disfrutar de nuestros servicios sin tener que ser nuestro empleador directo.`,
    },
    {
        question: '¿Cómo puedo contratar al equipo de NovaScript?',
        answer: `Empezar a trabajar con nosotros es tan fácil como enviarnos un mensaje. Al final de esta página tienes un formulario de contacto
en el que nos puedes explicar qué necesitas, así mismo puedes utilizar el enlace de la barra de navegación para hablarnos por WhatsApp o el 
del pie de página para agendar una videollamada.`,
    },
    {
        question:
            '¿Con qué tecnologías de desarrollo estáis más familiarizados?',
        answer: `Somos bastante políglotas, por lo que este párrafo se nos queda algo pequeño para enumerar todas las tecnologías que manejamos. 
Sin embargo, destacamos principalmente con React (Remix y Next.js), Go, todo tipo de CMS (Wordpress, Webflow, Framer etc.) y Flutter para desarrollo móvil.`,
    },
    {
        question:
            '¿Ofrecéis servicios de mantenimiento y soporte post-lanzamiento?',
        answer: `Por supuesto, de hecho es uno de nuestros valores fundamentales: mantener nuestro compromiso con el éxito de tu negocio a lo largo del tiempo. 
Pase lo que pase, vamos a estar ahí si necesitas cualquier tipo de actualización o si algo no funciona como debe.`,
    },
    {
        question:
            '¿Facturáis en base a presupuestos cerrados u horas trabajadas?',
        answer: `Podemos trabajar bajo ambos modelos, siempre favoreceremos el que mejor te venga a ti como cliente. A diferencia de otras agencias, nosotros 
            sabemos estimar proyectos de forma sumamente precisa, por lo que podrás prever, de forma sencilla, cuánto costará tu desarrollo.`,
    },
]

//@ts-expect-error idk
export const meta: MetaFunction = (payload: {
    data: {
        serviceCards: ServiceCard[]
    }
}) => {
    const { serviceCards } = payload.data

    return [
        ...getBasicMetas({
            title: `${SITE_TITLE} - ${SITE_NAME}`,
            description: SITE_DESCRIPTION,
        }),
        {
            'script:ld+json': [
                getBusinessJsonLd(),
                getBreadcrumbJsonLd([
                    ...[
                        {
                            name: 'Nuestro Trabajo',
                            position: 1,
                            item: `${SITE_BASE_URL}/nuestro-trabajo`,
                        },
                    ],
                    ...serviceCards.map((service, index) =>
                        fromServiceCardToBreadCrumbJsonLdItem(
                            service,
                            index + 1
                        )
                    ),
                ]),
                getFaqsJsonLd(faqs),
            ],
        },
    ]
}

export default function Home() {
    const { posts, serviceCards } = useLoaderData<typeof loader>()

    return (
        <Page>
            <Hero />
            <Services serviceCards={serviceCards} />
            <OurProcess />
            <Faq data={faqs} />
            <Blog posts={posts} />
            <ScrollAnimation once={true} animateIn="fadeIn">
                <Contact />
            </ScrollAnimation>
        </Page>
    )
}
