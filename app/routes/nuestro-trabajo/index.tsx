import { json, MetaFunction } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'
import { appendImgUrlToProjects, getProjects } from '~/actions/projects'
import { FakeBackgroundImagePrimitive } from '~/components/atoms/FakeBackgroundImagePrimitive'
import Overlay from '~/components/atoms/Overlay'
import SectionHeading from '~/components/pages/Home/SectionHeading'
import Page from '~/components/templates/Page'
import { IMAGE_KIT_BASE_URL } from '~/consts'
import { Project } from '~/types/contentful'
import { getBasicMetas } from '~/utils/metas'
import { getCacheControlHeader } from '~/utils/server'

export async function loader() {
    let projects: Project[] = await getProjects()
    projects = await appendImgUrlToProjects(projects)
    return json(
        { projects },
        {
            headers: {
                'Cache-Control': getCacheControlHeader('ONE_WEEK'),
            },
        }
    )
}

export const meta: MetaFunction = () => {
    return [
        ...getBasicMetas({
            title: 'Nuestro Trabajo Como Empresa de Software y Diseño Web',
            description: `Hemos tenido el placer de trabajar desarrollando el software y diseñando 
                las páginas web para decenas de empresas y negocios consolidados, PYMES y Startups. Deja que te mostremos
                algunos de los proyectos en los que nos hemos involucrado.`,
            img: `${IMAGE_KIT_BASE_URL}/tr:f-webp/meta.png`,
            appendSiteName: true,
        }),
        {
            'script:ld+json': {
                '@context': 'https://schema.org',
                '@type': 'Corporation',
                name: 'NovaScript',
                url: 'https://novascript.io/',
                logo: `${IMAGE_KIT_BASE_URL}/tr:w-48,ar-1-1/favicon.png`,
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

export default function NuestroTrabajo() {
    const { projects } = useLoaderData<typeof loader>()

    return (
        <Page>
            <div className="flex flex-col">
                <SectionHeading
                    title="Nuestro trabajo como <br class='hidden sm:block'/><span class='font-accent tracking-normal'>empresa de software</span>"
                    description={`Hemos tenido el placer de trabajar desarrollando el software y diseñando 
                    las páginas web para decenas de empresas y negocios consolidados, PYMES y Startups. Deja que te mostremos
                    algunos de los proyectos en los que nos hemos involucrado.`}
                />
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, index: number) => {
                        return (
                            <Link
                                key={index}
                                to={project.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FakeBackgroundImagePrimitive.Container className="aspect-h-9 aspect-w-16 rounded-xl">
                                    <FakeBackgroundImagePrimitive.Image
                                        src={project.imgUrl}
                                        alt={project.imgUrl}
                                        className="cursor-pointer transition-all duration-500 hover:scale-105"
                                    />
                                    <Overlay className="pointer-events-none flex items-center justify-center bg-black/70 p-5">
                                        <h2 className="text-center text-xl">
                                            {project.seoTitle}
                                        </h2>
                                    </Overlay>
                                </FakeBackgroundImagePrimitive.Container>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </Page>
    )
}
