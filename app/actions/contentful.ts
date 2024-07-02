import { Post } from '~/types/contentful'
import { getPostSections, getPostReadingTimeInMinutes } from '~/utils/post'

const BASE_URL = 'https://cdn.contentful.com'
const SPACE = 'dbho2mzjh6aw'
const ACCESS_TOKEN = 'uphVhWBCLkUeRsDOEIQEZpmPE4CnX_bQtu-F7EibTBc'
const AUTH_QUERY_PARAM = `access_token=${ACCESS_TOKEN}`
const ENDPOINTS = {
    getEntryBy: (contentType: string, by: string, byValue: string) =>
        `${BASE_URL}/spaces/${SPACE}/entries?${AUTH_QUERY_PARAM}&content_type=${contentType}&fields.${by}=${byValue}`,
    getLatestEntries: (contentType: string, limit: number) =>
        `${BASE_URL}/spaces/${SPACE}/entries?${AUTH_QUERY_PARAM}&content_type=${contentType}&order=-sys.createdAt&limit=${limit}`,
    getAssetUrlById: (assetId: string) =>
        `${BASE_URL}/spaces/${SPACE}/assets/${assetId}?${AUTH_QUERY_PARAM}`,
}

export async function getPostBySlug(slug: string) {
    const response = await fetch(ENDPOINTS.getEntryBy('post', 'slug', slug))
    const { items } = (await response.json()) as any

    const post = {
        ...items[0].fields,
        createdAt: items[0].sys.createdAt,
        updatedAt: items[0].sys.updatedAt,
        readingTime: getPostReadingTimeInMinutes(items[0].fields.content),
        sections: getPostSections(items[0].fields.content),
    } as Post

    if (items[0].fields.headerImg) {
        post.headerImgUrl = await getAssetUrl(items[0].fields.headerImg.sys.id)
    }

    return post
}

export async function getLatestPosts(limit = 3) {
    const response = await fetch(ENDPOINTS.getLatestEntries('post', limit))
    const { items } = (await response.json()) as any

    const posts: Post[] = await Promise.all(
        items.map(async (item: any) => {
            const post = {
                ...item.fields,
                createdAt: item.sys.createdAt,
                updatedAt: items[0].sys.updatedAt,
                readingTime: getPostReadingTimeInMinutes(item.fields.content),
                sections: getPostSections(item.fields.content),
            } as Post

            post.authorAvatarUrl = await getAssetUrl(
                item.fields.authorAvatar.sys.id
            )

            if (item.fields.headerImg) {
                post.headerImgUrl = await getAssetUrl(
                    item.fields.headerImg.sys.id
                )
            }

            return post
        })
    )

    return posts
}

export async function getAssetUrl(assetId: string) {
    const response = await fetch(ENDPOINTS.getAssetUrlById(assetId))
    const { fields } = (await response.json()) as any
    return fields.file.url as string
}
