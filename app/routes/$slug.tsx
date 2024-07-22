import {
    json,
    LoaderFunctionArgs,
    MetaFunction,
    redirect,
} from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { renderToStaticMarkup } from 'react-dom/server'
import {
    getPostBySlug,
    getServiceBySlug,
    getServices,
} from '~/actions/contentful'
import PostHook from '~/components/pages/Slug/PostHook'
import PostLayout from '~/components/pages/Slug/PostLayout'
import ServiceLayout from '~/components/pages/Slug/ServiceLayout'
import { Service, type Post } from '~/types/contentful'
import {
    getArticleJsonLd,
    getBasicMetas,
    getFaqsJsonLd,
    getProductServiceJsonLd,
} from '~/utils/metas'
import injectHook, { getPostImageUrls } from '~/utils/posts'
import { getCacheControlHeader, serviceRedirects } from '~/utils/server'

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url)
    const slug = url.pathname.split('/')[1]

    //@ts-expect-error idk
    if (serviceRedirects[slug]) {
        //@ts-expect-error idk
        return redirect(`/${serviceRedirects[slug]}`, 301)
    }

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

            if (post.hookTitle && post.hookDescription) {
                post.content = injectHook(
                    post.content,
                    renderToStaticMarkup(
                        <PostHook
                            title={post.hookTitle}
                            description={post.hookDescription}
                        />
                    )
                )
            }
        }

        return json(
            {
                post,
                postImageUrls: post
                    ? [
                          `https:${post.headerImgUrl}`,
                          ...getPostImageUrls(post.content),
                      ]
                    : [],
                service,
                services: services
                    ? services!.filter((service) => service.slug !== slug)
                    : [],
            },
            {
                headers: {
                    'Cache-Control': getCacheControlHeader('ONE_WEEK'),
                },
            }
        )
    } catch (e) {
        return redirect('/')
    }
}

const reviews = [
    {
        author: 'Stefan Dreverman',
        body: 'Los recomendaría sin dudarlo. Siempre consiguen encontrar una solución perfecta para las necesidades de tu negocio. Carlos es una persona seria y responsable.',
    },
    {
        author: 'Joaquin Galan',
        body: 'Son los mejores especialistas que podrás encontrar en el campo del diseño web y el desarrollo de software para pequeñas y medianas empresas. Destacaría el excelente trato, la atención al detalle, su cercanía, compromiso, apoyo, formalidad y calidad/precio. 100% recomendados.',
    },
    {
        author: 'Lourdes Mata de Damas',
        body: 'Todo fenomenal con ellos, son excelentes profesionales. En menos de 1 semana tenía mi sitio web funcionando. Son un equipo sobresaliente en todo lo relativo a la creación de productos digitales, ya sean páginas web, software personalizado para empresas e integraciones. ¡Recomendadísimos!',
    },
    {
        author: 'Monika Milenova',
        body: 'Captaron mi idea a la primera y la ejecutaron a la perfección. Había pasado por un infierno tratando con agencias que solo me querían sacar el dinero, NovaScript fue la solución.',
    },
    {
        author: 'Elena Diaz Sanchez',
        body: 'No tengo ninguna pega, son buenos en todo lo que tiene que ver con diseño web y desarrollo de software, rápidos y atentos. Si lo necesito, repetiré sin dudarlo.',
    },
]

// @ts-expect-error idk
export const meta: MetaFunction = (payload: {
    data: { post: Post; postImageUrls: string[]; service: Service }
}) => {
    const { post, postImageUrls, service } = payload.data

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
                      'script:ld+json': [getArticleJsonLd(post, postImageUrls)],
                  },
              ]
            : [
                  {
                      'script:ld+json': [
                          getProductServiceJsonLd(service, reviews),
                          getFaqsJsonLd(service.faqs),
                      ],
                  },
              ]),
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
