import { ContentfulFilters, Service } from '~/types/contentful'
import {
    createContentfulFilters,
    createContentfulUrl,
    getAssetUrl,
    getEntryById,
} from './contentfulv2'

async function appendHeaderImgUrls(services: Service[]) {
    const result = await Promise.all(
        services.map(async (service) => {
            const headerImgUrl = await getAssetUrl(service.headerImg.sys.id)
            return {
                ...service,
                headerImgUrl,
            }
        })
    )

    return result || []
}

async function appendFAQs(services: Service[]) {
    const result = []
    for (const service of services) {
        const faqs = await Promise.all(
            (service.faqs || []).flatMap(async (reference: any) => {
                const data = await getEntryById(reference.sys.id)
                if (data) {
                    return {
                        question: data.question,
                        answer: data.answer,
                    }
                }
            })
        )

        result.push({ ...service, faqs })
    }

    return result
}

function createApi(filters: ContentfulFilters) {
    const state = {
        filters,
        appendHeaderImgUrls: false,
        appendFAQs: false,
    }

    const api = {
        appendHeaderImgUrls() {
            state.appendHeaderImgUrls = true
            return api
        },
        appendFAQs() {
            state.appendFAQs = true
            return api
        },
        async get() {
            const response = await fetch(
                createContentfulUrl(createContentfulFilters(state.filters))
            )
            const { items } = (await response.json()) as any

            if (!items || items.length === 0) {
                return null
            }

            let services = items.map((item: any) => ({
                ...item.fields,
                createdAt: item.sys.createdAt,
                updatedAt: item.sys.updatedAt,
            })) as Service[]

            if (state.appendHeaderImgUrls) {
                services = await appendHeaderImgUrls(services)
            }

            if (state.appendFAQs) {
                services = (await appendFAQs(services)) as any
            }

            return services
        },
    }

    return api
}

const Services = {
    getBySlug(slug: string) {
        const filters = {
            contentType: 'service',
            limit: 1,
            where: `fields.slug=${slug}`,
        }

        return createApi(filters)
    },
    all() {
        const filters = {
            contentType: 'service',
            limit: 10,
            select: [
                'fields.cardTitle',
                'fields.cardDescription',
                'fields.enabled',
                'fields.slug',
                'fields.iconString',
                'sys',
            ],
        }

        return createApi(filters)
    },
}
export default Services
