import { SITE_NAME } from '~/consts'

export function getBasicMetas({
    title,
    description,
    img,
    appendSiteName = false,
    type = 'website',
}: {
    title: string
    description: string
    img: string
    appendSiteName?: boolean
    type?: 'website' | 'article'
}) {
    const metaTitle = `${title}${appendSiteName ? ` - ${SITE_NAME}` : ''}`

    return [
        { title: metaTitle },
        {
            property: 'og:title',
            content: metaTitle,
        },
        {
            name: 'description',
            content: description,
        },
        {
            property: 'og:description',
            content: description,
        },
        {
            name: 'robots',
            content:
                'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        },
        {
            property: 'og:type',
            content: type,
        },
        {
            property: 'og:image',
            content: img,
        },
        {
            property: 'og:image:width',
            content: '1366',
        },
        {
            property: 'og:image:height',
            content: '768',
        },
        {
            property: 'og:image:type',
            content: 'image/webp',
        },
        {
            property: 'og:site_name',
            content: 'NovaScript',
        },
        {
            name: 'twitter:card',
            content: 'summary_large_image',
        },
        {
            name: 'twitter:title',
            content: title,
        },
        {
            name: 'twitter:name',
            content: '@novascriptio',
        },
    ]
}
