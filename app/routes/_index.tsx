import 'animate.css/animate.compat.css'

import { json, type MetaFunction } from '@remix-run/cloudflare'
import Page from '~/components/templates/Page'
import Faq from '~/components/pages/Home/Faq'
import Hero from '~/components/pages/Home/Hero'
import OurProcess from '~/components/pages/Home/OurProcess'
import Services from '~/components/pages/Home/Services'
import Contact from '~/components/pages/shared/Contact'
import { IMAGE_KIT_BASE_URL } from '~/consts'
import { getLatestPosts, getServices } from '~/actions/contentful'
import Blog from '~/components/pages/Home/Blog'
import { useLoaderData } from '@remix-run/react'
import ScrollAnimation from 'react-animate-on-scroll'
import { getBasicMetas } from '~/utils/meta'

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

    return json({
        posts,
        serviceCards: serviceCards.sort((a, b) => (a === b ? 0 : a ? -1 : 1)),
    })
}

export const meta: MetaFunction = () => {
    return [
        ...getBasicMetas({
            title: 'Software y Diseño Web para Empresas',
            description: `Somos la empresa de desarrollo de software y diseño web líder en el sector, operamos en toda España 
                apoyando a pequeñas y medianas empresas mediante la creación de software a medida, 
                apps móviles, páginas web, tiendas online y asesorándolas tecnológicamente.`,
            img: `${IMAGE_KIT_BASE_URL}/tr:f-webp/meta.png`,
            appendSiteName: true,
        }),
        {
            'script:ld+json': {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'NovaScript',
                url: 'https://novascript.io/',
                logo: `${IMAGE_KIT_BASE_URL}/tr:w-16,ar-1-1,f-webp/favicon.png`,
                sameAs: [
                    'https://twitter.com/novascriptio',
                    'https://www.linkedin.com/company/novascript-io/',
                    'https://www.facebook.com/profile.php?id=61557708621835',
                ],
                contactPoint: [
                    {
                        '@type': 'ContactPoint',
                        telephone: '674386776',
                        contactType: 'customer service',
                        email: 'hi@novascript.io',
                        availableLanguage: 'es',
                    },
                ],
            },
        },
    ]
}

export default function Home() {
    const { posts, serviceCards } = useLoaderData<typeof loader>()

    return (
        <Page>
            <Hero />
            <Services cards={serviceCards} />
            <OurProcess />
            <Faq />
            <Blog posts={posts} />
            <ScrollAnimation once={true} animateIn="fadeIn">
                <Contact />
            </ScrollAnimation>
        </Page>
    )
}
