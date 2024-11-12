import { Project } from '~/types/contentful'
import {
    createContentfulFilters,
    createContentfulUrl,
    getAssetUrl,
} from './contentful'

export async function getProjects() {
    const response = await fetch(
        createContentfulUrl(
            createContentfulFilters({
                contentType: 'project',
                limit: 100,
            })
        )
    )

    const { items } = (await response.json()) as any

    if (items && items.length > 0) {
        return items.map((item: any) => item.fields as Project)
    }

    return []
}

export async function appendImgUrlToProjects(projects: Project[]) {
    const result = await Promise.all(
        projects.map(async (project) => {
            const imgUrl = await getAssetUrl(project.img.sys.id)
            return {
                ...project,
                imgUrl,
            }
        })
    )

    return result || []
}
