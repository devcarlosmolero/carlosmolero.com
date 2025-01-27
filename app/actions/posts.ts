import { ContentfulFilters, Post } from '~/types/contentful'
import {
    createContentfulFilters,
    createContentfulUrl,
    getAssetUrl,
} from './contentful'
import { format } from 'date-fns'

async function appendHeaderImgUrls(posts: Post[]) {
    const result = await Promise.all(
        posts.map(async (post) => {
            const headerImgUrl = await getAssetUrl(post.headerImg.sys.id)
            return {
                ...post,
                headerImgUrl,
            }
        })
    )

    return result || []
}

function createApi(filters: ContentfulFilters) {
    const state = {
        filters,
        appendHeaderImgUrls: false,
        formatDates: false,
    }

    const api = {
        appendHeaderImgUrls() {
            state.appendHeaderImgUrls = true
            return api
        },
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

            let posts = items.map((item: any) => ({
                ...item.fields,
                createdAt: item.sys.createdAt,
                updatedAt: item.sys.updatedAt,
            })) as Post[]

            if (state.appendHeaderImgUrls) {
                posts = await appendHeaderImgUrls(posts)
            }

            if (state.formatDates) {
                posts = posts.map((post) => ({
                    ...post,
                    formattedCreatedAt: format(
                        new Date(post.createdAt!),
                        'dd/MM/yyyy'
                    ),
                    formattedUpdatedAt: format(
                        new Date(post.updatedAt!),
                        'dd/MM/yyyy'
                    ),
                }))
            }

            return posts
        },
    }

    return api
}

const Posts = {
    getBySlug(slug: string) {
        const filters = {
            contentType: 'post',
            where: `fields.slug=${slug}`,
        }

        return createApi(filters)
    },
    getRelatedByCategory(categories: string[], slug: string) {
        const filters = {
            contentType: 'post',
            select: [
                'fields.seoTitle',
                'fields.seoDescription',
                'fields.headerImg',
                'fields.slug',
                'sys',
            ],
            limit: 5,
            where: `fields.categories[in]=${categories.join(',')}&fields.slug[ne]=${slug}`,
        }

        return createApi(filters)
    },
    async count() {
        const filters = {
            contentType: 'post',
            select: ['sys'],
            where: `fields.isSuccessCase[ne]=true`
        }

        const response = await fetch(
            createContentfulUrl(createContentfulFilters(filters))
        )
        const { total } = (await response.json()) as any
        return total
    },
    all(limit = 9, skip = 0, pullSuccessCases = false) {
        const filters = {
            contentType: 'post',
            limit,
            skip,
            select: [
                'fields.seoTitle',
                'fields.seoDescription',
                'fields.slug',
                'fields.headerImg',
                'fields.categories',
                'sys',
            ],
            order: '-sys.createdAt',
            where: `fields.isSuccessCase[ne]=${pullSuccessCases ? 'false' : 'true'}`,
        }

        return createApi(filters)
    },
    latest(limit = 6) {
        const filters = {
            contentType: 'post',
            limit,
            select: [
                'fields.seoTitle',
                'fields.seoDescription',
                'fields.slug',
                'fields.headerImg',
                'fields.categories',
                'sys',
            ],
            order: '-sys.createdAt',
            where: `fields.isSuccessCase[ne]=true`
        }

        return createApi(filters)
    },
}
export default Posts
