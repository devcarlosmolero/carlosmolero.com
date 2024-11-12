import { ContentfulFilters, JobOffer } from '~/types/contentful'
import { createContentfulFilters, createContentfulUrl } from './contentful'
import { format } from 'date-fns'

function createApi(filters: ContentfulFilters) {
    const state = {
        filters,

        formatDates: false,
    }

    const api = {
        formatDates() {
            state.formatDates = true
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

            let jobOffers = items.map((item: any) => ({
                ...item.fields,
                createdAt: item.sys.createdAt,
                updatedAt: item.sys.updatedAt,
            })) as JobOffer[]

            if (state.formatDates) {
                jobOffers = jobOffers.map((jobOffer) => ({
                    ...jobOffer,
                    formattedCreatedAt: format(
                        new Date(jobOffer.createdAt!),
                        'dd/MM/yyyy'
                    ),
                    formattedUpdatedAt: format(
                        new Date(jobOffer.updatedAt!),
                        'dd/MM/yyyy'
                    ),
                }))
            }

            return jobOffers
        },
    }

    return api
}

const JobOffers = {
    getBySlug(slug: string) {
        const filters = {
            contentType: 'jobOffer',
            limit: 1,
            where: `fields.slug=${slug}`,
        }

        return createApi(filters)
    },
}
export default JobOffers
