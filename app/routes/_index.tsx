import 'animate.css/animate.compat.css'

import {
    ActionFunctionArgs,
    json,
    type MetaFunction,
} from '@remix-run/cloudflare'
import Page from '~/components/templates/Page'
import Faq from '~/components/pages/Home/Faq'
import Hero from '~/components/pages/Home/Hero'
import OurProcess from '~/components/pages/Home/OurProcess'
import Services from '~/components/pages/Home/Services'
import Contact from '~/components/pages/shared/Contact'
import { IMAGE_KIT_BASE_URL } from '~/consts'
import { getLatestPosts } from '~/actions/contentful'
import Blog from '~/components/pages/Home/Blog'
import { useLoaderData } from '@remix-run/react'

export async function loader() {
    const posts = await getLatestPosts(6)
    return json(posts)
}

export const meta: MetaFunction = () => {
    return [
        { title: 'Desarrollo de Software y Diseño Web - NovaScript' },
        {
            property: 'og:title',
            content: 'Desarrollo de Software y Diseño Web - NovaScript',
        },
        {
            name: 'description',
            content:
                'Optimiza tu PYME/Startup con software a medida: desarrollo de apps web, iOS y Android, producto mínimo viable, cloud, diseño web, y más soluciones tecnológicas.',
        },
        {
            property: 'og:description',
            content:
                'Optimiza tu PYME/Startup con software a medida: desarrollo de apps web, iOS y Android, producto mínimo viable, cloud, diseño web, y más soluciones tecnológicas.',
        },
        {
            name: 'robots',
            content:
                'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        },
        {
            property: 'og:type',
            content: 'website',
        },
        {
            property: 'og:image',
            content: `${IMAGE_KIT_BASE_URL}/tr:f-webp/meta.png`,
        },
        {
            property: 'og:image:width',
            content: '1366',
        },
        {
            property: 'og:image:height',
            content: '768',
        },
        {
            property: 'og:image:type',
            content: 'image/webp',
        },
        {
            property: 'og:site_name',
            content: 'NovaScript',
        },
        {
            name: 'twitter:card',
            content: 'summary_large_image',
        },
        {
            name: 'twitter:title',
            content: 'Desarrollo de Software y Diseño Web - NovaScript',
        },
        {
            name: 'twitter:name',
            content: '@novascriptio',
        },
    ]
}

export async function action({ request }: ActionFunctionArgs) {
    console.log(await request.formData())
    return json({ success: true })
}

export default function Home() {
    const posts = useLoaderData<typeof loader>()

    return (
        <Page>
            <Hero />
            <Services />
            <OurProcess />
            <Faq />
            <Blog posts={posts} />
            <Contact />
        </Page>
    )
}
