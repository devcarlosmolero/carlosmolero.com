import { json, LoaderFunctionArgs, redirect } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import {
    getPostBySlug,
    getServiceBySlug,
    getServices,
} from '~/actions/contentful'
import PostLayout from '~/components/templates/PostLayout'
import ServiceLayout from '~/components/templates/ServiceLayout'
import { Service, type Post } from '~/types/contentful'

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url)
    const slug = url.pathname.split('/')[1]
    const servicesSlugs = (await getServices(10, ['fields.slug', 'sys'])).map(
        (service) => service.slug
    )

    let post: Post | undefined
    let service: Service | undefined

    try {
        if (servicesSlugs.includes(slug)) {
            service = await getServiceBySlug(slug)
        } else {
            post = await getPostBySlug(slug)
            post.createdAt = new Date(post.createdAt!).toLocaleDateString('es')
        }

        return json({
            post,
            service,
        })
    } catch (e) {
        return redirect('/')
    }
}

export const meta = (payload: { data: { post: Post; service: Service } }) => {
    const { post, service } = payload.data

    return [
        { title: post?.seoTitle || `${service?.seoTitle} - NovaScript` },
        {
            property: 'og:title',
            content: post?.seoTitle || `${service?.seoTitle} - NovaScript`,
        },
        {
            name: 'description',
            content: post?.seoDescription || service?.seoDescription,
        },
        {
            property: 'og:description',
            content: post?.seoDescription || service?.seoDescription,
        },
        {
            name: 'robots',
            content:
                'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        },
        {
            property: 'og:type',
            content: post ? 'article' : 'website',
        },
        {
            property: 'og:image',
            content: `https:${post?.headerImgUrl || service?.headerImgUrl}`,
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
            content: post?.seoTitle || `${service?.seoTitle} - NovaScript`,
        },
        {
            name: 'twitter:name',
            content: '@novascriptio',
        },
    ]
}

export default function Post() {
    const { post, service } = useLoaderData<typeof loader>()

    if (post) {
        return <PostLayout post={post} />
    }

    if (service) {
        return <ServiceLayout service={service} />
    }
}
