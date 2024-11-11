import {
    json,
    LoaderFunctionArgs,
    MetaFunction,
    redirect,
} from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { renderToStaticMarkup } from 'react-dom/server'
import Posts from '~/actions/posts'
import Services from '~/actions/services'
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
import injectPostHook, {
    getPostImageUrls,
    getPostSections,
} from '~/utils/posts'
import { getCacheControlHeader, serviceRedirects } from '~/utils/server'
import { injectServiceBenefits } from '~/utils/services'

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url)
    const slug = url.pathname.split('/')[1]

    //@ts-expect-error idk
    if (serviceRedirects[slug]) {
        //@ts-expect-error idk
        return redirect(`/${serviceRedirects[slug]}`, { status: 301 })
    }

    const services = (await Services.all().get()) ?? []

    let post: Post | undefined
    let relatedPostsByCategory: Post[] = []
    let service: Service | undefined

    try {
        if (services?.map((service) => service.slug).includes(slug)) {
            service = (await Services.getBySlug(slug)
                .appendHeaderImgUrls()
                .appendFAQs()
                .get())![0] as Service

            service.content = injectServiceBenefits(service.content)
        } else {
            post = (await Posts.getBySlug(slug)
                .appendHeaderImgUrls()
                .formatDates()
                .get())![0] as Post

            post.sections = getPostSections(post.content)

            if (post.hookTitle && post.hookDescription) {
                post.content = injectPostHook(
                    post.content,
                    renderToStaticMarkup(
                        <PostHook
                            title={post.hookTitle}
                            description={post.hookDescription}
                        />
                    )
                )
            }

            relatedPostsByCategory = (await Posts.getRelatedByCategory(
                post.categories,
                post.slug!
            )
                .appendHeaderImgUrls()
                .get()) as Post[]
        }

        return json(
            {
                post,
                relatedPostsByCategory,
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
            image: `https:${post?.headerImgUrl || service?.headerImgUrl}`,
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
                          getFaqsJsonLd(service.faqs!),
                      ],
                  },
              ]),
    ]
}

export default function Post() {
    const { post, relatedPostsByCategory, service, services } =
        useLoaderData<typeof loader>()

    if (post) {
        return (
            <PostLayout
                relatedPostsByCategory={relatedPostsByCategory as Post[]}
                post={post as Post}
            />
        )
    }

    if (service) {
        return (
            <ServiceLayout
                service={service as Service}
                cards={services! as Service[]}
            />
        )
    }
}
