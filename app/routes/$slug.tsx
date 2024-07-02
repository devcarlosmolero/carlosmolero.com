import { json, LoaderFunctionArgs, redirect } from '@remix-run/cloudflare'
import { MetaFunction, useLoaderData } from '@remix-run/react'
import { getPostBySlug } from '~/actions/contentful'
import PostLayout from '~/components/templates/PostLayout'
import { type Post } from '~/types/contentful'

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url)

    try {
        const post = await getPostBySlug(url.pathname.split('/')[1])
        return json(post)
    } catch (e) {
        return redirect('/')
    }
}

export const meta: MetaFunction = ({ data }: { data: any }) => {
    const post = data as Post

    return [
        { title: post.seoTitle },
        {
            property: 'og:title',
            content: post.seoTitle,
        },
        {
            name: 'description',
            content: post.seoDescription,
        },
        {
            property: 'og:description',
            content: post.seoDescription,
        },
        {
            name: 'robots',
            content:
                'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        },
        {
            property: 'og:type',
            content: 'article',
        },
        {
            property: 'og:image',
            content: `https:${post.headerImgUrl}`,
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
            content: post.seoTitle,
        },
        {
            name: 'twitter:name',
            content: '@novascriptio',
        },
    ]
}

export default function Post() {
    const post = useLoaderData<typeof loader>()

    return <PostLayout post={post} />
}
