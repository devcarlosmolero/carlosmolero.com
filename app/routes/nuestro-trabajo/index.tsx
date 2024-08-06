import { json, MetaFunction } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { appendImgUrlToProjects, getProjects } from '~/actions/projects'
import PortfolioProject from '~/components/organisms/PortfolioProject'
import LogoCarousel from '~/components/pages/Home/LogoCarousel'
import SectionHeading from '~/components/pages/Home/SectionHeading'
import Contact from '~/components/pages/shared/Contact'
import Page from '~/components/templates/Page'
import { IMAGE_KIT_BASE_URL } from '~/consts'
import { Project } from '~/types/contentful'
import { getBasicMetas, getBusinessJsonLd } from '~/utils/metas'
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
            'script:ld+json': [getBusinessJsonLd()],
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
                    <PortfolioProject
                        project={
                            {
                                seoTitle: 'Tu Proyecto',
                                imgUrl: `${IMAGE_KIT_BASE_URL}/tr:w-400,ar-16-9/project-placeholder.webp`,
                                url: '#contacto',
                                categories: ['Contacta con Nosotros'],
                            } as any
                        }
                    />
                    {projects.map((project, index: number) => {
                        return (
                            <PortfolioProject
                                key={index}
                                project={project as Project}
                            />
                        )
                    })}
                </div>
                <div className="mt-12">
                    <LogoCarousel heading="" />
                </div>
            </div>

            <Contact />
        </Page>
    )
}
