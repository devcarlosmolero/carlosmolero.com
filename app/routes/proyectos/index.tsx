import { useLoaderData } from '@remix-run/react'
import { appendImgUrlToProjects, getProjects } from '~/actions/projects'
import { FakeBackgroundImagePrimitive } from '~/components/atoms/FakeBackgroundImagePrimitive'
import Overlay from '~/components/atoms/Overlay'
import SectionHeading from '~/components/pages/Home/SectionHeading'
import Page from '~/components/templates/Page'
import { Project } from '~/types/contentful'

export async function loader() {
    let projects: Project[] = await getProjects()
    projects = await appendImgUrlToProjects(projects)

    return {
        projects,
    }
}

export default function Proyectos() {
    const { projects } = useLoaderData<typeof loader>()

    return (
        <Page>
            <SectionHeading
                title="Nuestro trabajo como <span class='font-accent tracking-normal'>empresa de software</span>"
                description={`Hemos tenido el placer de trabajar desarrollando el software y diseñando 
                las páginas web para decenas de empresas y negocios consolidados, PYMES y Startups. Deja que te mostremos
                algunos de los proyectos en los que nos hemos involucrado.`}
            />
            <div className="grid grid-cols-3 gap-5">
                {projects.map((project, index: number) => {
                    return (
                        <FakeBackgroundImagePrimitive.Container
                            key={index}
                            className="aspect-h-9 aspect-w-16 rounded-xl"
                        >
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
                    )
                })}
            </div>
        </Page>
    )
}
