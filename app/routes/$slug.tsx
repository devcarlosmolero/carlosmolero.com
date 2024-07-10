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
import { IMAGE_KIT_BASE_URL } from '~/consts'
import { Service, type Post } from '~/types/contentful'
import { getBasicMetas } from '~/utils/meta'
import { serviceRedirects } from '~/utils/server'

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url)
    const slug = url.pathname.split('/')[1]

    //@ts-expect-error idk
    if (serviceRedirects[slug]) {
        console.log('hello!')
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
                              url: `https:${post.headerImgUrl}`,
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
                                  url: `${IMAGE_KIT_BASE_URL}/tr:w-16,ar-1-1,f-webp/favicon.png`,
                                  width: '60',
                                  height: '60',
                              },
                          },
                          datePublished: post.createdAt,
                      },
                  },
              ]
            : [
                  {
                      'script:ld+json': {
                          '@context': 'http://schema.org',
                          '@type': 'LocalBusiness',
                          name: 'NovaScript',
                          image: `${IMAGE_KIT_BASE_URL}/tr:w-16,ar-1-1,f-webp/favicon.png`,
                          telephone: '+34 674 386 776',
                          email: 'hi@novascript.io',
                          address: {
                              '@type': 'PostalAddress',
                              streetAddress: 'C. Molina Lario',
                              addressLocality: 'Málaga',
                              addressRegion: 'Málaga',
                              postalCode: '29015',
                              addressCountry: 'ES',
                          },
                          url: 'https://novascript.io',
                          priceRange: '500-1500€',
                          description: service!.seoDescription,
                          aggregateRating: {
                              '@type': 'AggregateRating',
                              ratingValue: '5',
                              reviewCount: '4',
                          },
                          review: [
                              {
                                  '@type': 'Review',
                                  author: {
                                      '@type': 'Person',
                                      name: 'Stefan Dreverman',
                                  },
                                  reviewRating: {
                                      '@type': 'Rating',
                                      ratingValue: '5',
                                      bestRating: '5',
                                  },
                                  reviewBody: `Los recomendaría sin dudarlo. Siempre consiguen encontrar una solución perfecta para las necesidades de 
                                  tu negocio. Carlos es una persona seria y responsable.`,
                              },
                              {
                                  '@type': 'Review',
                                  author: {
                                      '@type': 'Person',
                                      name: 'Joaquin Galan',
                                  },
                                  reviewRating: {
                                      '@type': 'Rating',
                                      ratingValue: '5',
                                      bestRating: '5',
                                  },
                                  reviewBody: `Son los mejores especialistas que podrás encontrar en el campo del diseño web y el desarrollo de software para pequeñas y medianas empresas.
                                  Destacaría el excelente trato, la atención al detalle, su cercanía, compromiso, apoyo, formalidad y calidad/precio. 100% recomendados.`,
                              },
                              {
                                  '@type': 'Review',
                                  author: {
                                      '@type': 'Person',
                                      name: 'Lourdes Mata de Damas',
                                  },
                                  reviewRating: {
                                      '@type': 'Rating',
                                      ratingValue: '5',
                                      bestRating: '5',
                                  },
                                  reviewBody: `Todo fenomenal con ellos, son excelentes profesionales. En menos de 1 semana tenía mi sitio web funcionando.
                                  Son un equipo sobresaliente en todo lo relativo a la creación de productos digitales, ya sean páginas web, software personalizado para empresas e integraciones.
                                  ¡Recomendadísimos!`,
                              },
                              {
                                  '@type': 'Review',
                                  author: {
                                      '@type': 'Person',
                                      name: 'Monika Milenova',
                                  },
                                  reviewRating: {
                                      '@type': 'Rating',
                                      ratingValue: '5',
                                      bestRating: '5',
                                  },
                                  reviewBody: `Captaron mi idea a la primera y la ejecutaron a la perfección. 
                                  Había pasado por un infierno tratando con agencias que solo me querían sacar el dinero, 
                                  NovaScript fue la solución.`,
                              },
                              {
                                  '@type': 'Review',
                                  author: {
                                      '@type': 'Person',
                                      name: 'Elena Diaz Sanchez',
                                  },
                                  reviewRating: {
                                      '@type': 'Rating',
                                      ratingValue: '5',
                                      bestRating: '5',
                                  },
                                  reviewBody:
                                      'No tengo ninguna pega, son buenos en todo lo que tiene que ver con diseño web y desarrollo de software, rápidos y atentos. Si lo necesito, repetiré sin dudarlo.',
                              },
                          ],
                          service: {
                              '@type': 'Service',
                              name: service.seoTitle,
                              description: service.seoDescription,
                          },
                      },
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
