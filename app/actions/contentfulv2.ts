import { ContentfulFilters } from '~/types/contentful'

const CONTENTFUL_CONFIG = {
    SPACE_ID: 'dbho2mzjh6aw',
    CDA: {
        BASE_URL: 'https://cdn.contentful.com',
        ACCESS_TOKEN: 'uphVhWBCLkUeRsDOEIQEZpmPE4CnX_bQtu-F7EibTBc',
    },
    CMA: {
        BASE_URL: 'https://api.contentful.com',
        ACCESS_TOKEN: 'CFPAT-dqPYRX3kHBW0ID5qGkElsQQLJM1GjiUKDIHfC76QIgA',
    },
}

export function createContentfulFilters({
    contentType,
    where,
    select,
    order,
    limit = 1,
}: ContentfulFilters) {
    let filtersQueryString = ''

    filtersQueryString += `&content_type=${contentType}`
    filtersQueryString += `&limit=${limit}`

    if (where && where.length > 0) {
        filtersQueryString += `&${where}`
    }

    if (select && select.length > 0) {
        filtersQueryString += `&select=${select?.join(',')}`
    }

    if (order && order.length > 0) {
        filtersQueryString += `&order=${order}`
    }

    console.log('[contentful]:', {
        contentType,
        where,
        select,
        order,
        limit,
    })

    return filtersQueryString
}

export function createContentfulUrl(filters: string) {
    const url = `${CONTENTFUL_CONFIG.CDA.BASE_URL}/spaces/${CONTENTFUL_CONFIG.SPACE_ID}/entries?access_token=${CONTENTFUL_CONFIG.CDA.ACCESS_TOKEN}${filters}`
    return url
}

export function createSingleContentfulUrl(entryId: string) {
    const url = `${CONTENTFUL_CONFIG.CDA.BASE_URL}/spaces/${CONTENTFUL_CONFIG.SPACE_ID}/environments/master/entries/${entryId}?access_token=${CONTENTFUL_CONFIG.CDA.ACCESS_TOKEN}`
    return url
}

export function createContentfulAssetUrl(assetId: string) {
    const url = `${CONTENTFUL_CONFIG.CDA.BASE_URL}/spaces/${CONTENTFUL_CONFIG.SPACE_ID}/assets/${assetId}?access_token=${CONTENTFUL_CONFIG.CDA.ACCESS_TOKEN}`
    return url
}

export async function getAssetUrl(assetId: string) {
    const response = await fetch(createContentfulAssetUrl(assetId))
    const { fields } = (await response.json()) as any
    return fields.file.url as string
}

export async function getEntryById(entryId: string) {
    const response = await fetch(createSingleContentfulUrl(entryId))
    const { fields } = (await response.json()) as any
    return fields
}
