import 'animate.css/animate.compat.css'

import { json, type MetaFunction } from '@remix-run/cloudflare'
import Page from '~/components/templates/Page'
import Faq from '~/components/pages/Home/Faq'
import Hero from '~/components/pages/Home/Hero'
import OurProcess from '~/components/pages/Home/OurProcess'
import Services from '~/components/pages/Home/Services'
import Contact from '~/components/pages/shared/Contact'
import { IMAGE_KIT_BASE_URL, SITE_DESCRIPTION, SITE_TITLE } from '~/consts'
import { getLatestPosts, getServices } from '~/actions/contentful'
import Blog from '~/components/pages/Home/Blog'
import { useLoaderData } from '@remix-run/react'
import ScrollAnimation from 'react-animate-on-scroll'
import {
    getBasicMetas,
    getBreadcrumbJsonLd,
    getBusinessJsonLd,
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

//@ts-expect-error idk
export const meta: MetaFunction = (payload: {
    data: {
        serviceCards: ServiceCard[]
    }
}) => {
    const { serviceCards } = payload.data

    return [
        ...getBasicMetas({
            title: SITE_TITLE,
            description: SITE_DESCRIPTION,
            img: `${IMAGE_KIT_BASE_URL}/tr:f-webp/meta.png`,
            appendSiteName: true,
        }),
        {
            'script:ld+json': [
                getBusinessJsonLd(),
                getBreadcrumbJsonLd(
                    serviceCards.map(fromServiceCardToBreadCrumbJsonLdItem)
                ),
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
            <Faq />
            <Blog posts={posts} />
            <ScrollAnimation once={true} animateIn="fadeIn">
                <Contact />
            </ScrollAnimation>
        </Page>
    )
}
