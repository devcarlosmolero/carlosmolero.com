import {
    json,
    LoaderFunctionArgs,
    MetaFunction,
    redirect,
} from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import {
    getPostBySlug,
    getServiceBySlug,
    getServices,
} from '~/actions/contentful'
import PostLayout from '~/components/templates/PostLayout'
import ServiceLayout from '~/components/templates/ServiceLayout'
import { Service, type Post } from '~/types/contentful'
import { getBasicMetas } from '~/utils/meta'

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url)
    const slug = url.pathname.split('/')[1]
    const servicesSlugs = (await getServices(10, ['fields.slug', 'sys'])).map(
        (service) => service.slug
    )

    let post: Post | undefined
    let service: Service | undefined
    let services: Service[] | undefined

    try {
        if (servicesSlugs.includes(slug)) {
            service = await getServiceBySlug(slug)
            services = await getServices(10, [
                'fields.cardTitle',
                'fields.cardDescription',
                'fields.slug',
                'fields.iconString',
                'fields.enabled',
                'sys',
            ])
        } else {
            post = await getPostBySlug(slug)
            post.formattedCreatedAt = new Date(
                post.createdAt!
            ).toLocaleDateString('es')
        }

        return json({
            post,
            service,
            services: services
                ? services!.filter((service) => service.slug !== slug)
                : [],
        })
    } catch (e) {
        return redirect('/')
    }
}

// @ts-expect-error idk
export const meta: MetaFunction = (payload: {
    data: { post: Post; service: Service }
}) => {
    const { post, service } = payload.data

    return [
        ...getBasicMetas({
            title: post?.seoTitle || service?.seoTitle,
            description: post?.seoDescription || service?.seoDescription,
            img: `https:${post?.headerImgUrl || service?.headerImgUrl}`,
            appendSiteName: Boolean(service),
        }),
        ...(post
            ? [
                  {
                      'script:ld+json': {
                          '@context': 'https://schema.org/',
                          '@type': 'Article',
                          headline: post.seoTitle,
                          description: post.seoDescription,
                          image: {
                              '@type': 'ImageObject',
                              url: `https://${post.headerImgUrl}`,
                              width: '1366',
                              height: '768',
                          },
                          author: {
                              '@type': 'Organization',
                              name: 'NovaScript',
                          },
                          publisher: {
                              '@type': 'Organization',
                              name: 'NovaScript',
                              logo: {
                                  '@type': 'ImageObject',
                                  url: 'https://ik.imagekit.io/jgh04cawf/novascriptio/tr:w-16,ar-1-1,f-webp/favicon.png',
                                  width: '60',
                                  height: '60',
                              },
                          },
                          datePublished: post.createdAt,
                      },
                  },
              ]
            : []),
    ]
}

export default function Post() {
    const { post, service, services } = useLoaderData<typeof loader>()

    if (post) {
        return <PostLayout post={post} />
    }

    if (service) {
        return <ServiceLayout service={service} cards={services!} />
    }
}
