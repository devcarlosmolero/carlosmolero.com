import {
    SITE_LINKEDIN_URL,
    SITE_PHONE_NUMBER,
    SITE_BASE_URL,
    SITE_EMAIL,
    SITE_X_HANDLE,
    SITE_X_URL,
    SITE_BASE_URL_EN,
    SITE_BASE_URL_ZH,
} from '~/consts'

export function getBasicMetas({
    title,
    description,
    robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
}: {
    title: string
    description: string
    image?: string
    robots?: string
}) {
    return [
        { title: title },
        {
            property: 'og:title',
            content: title,
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
            content: robots,
        },
        {
            property: 'og:type',
            content: 'website',
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
            content: SITE_X_HANDLE,
        },
    ]
}

export function getBusinessJsonLd(language = 'es') {
    return {
        '@context': 'https://schema.org',
        '@type': 'http://schema.org/Person',
        url:
            language === 'es'
                ? SITE_BASE_URL
                : language === 'zh'
                  ? SITE_BASE_URL_ZH
                  : SITE_BASE_URL_EN,
        logo: ``,
        sameAs: [SITE_X_URL, SITE_LINKEDIN_URL],
        contactPoint: [
            {
                '@type': 'ContactPoint',
                telephone: SITE_PHONE_NUMBER,
                contactType: 'customer service',
                email: SITE_EMAIL,
                availableLanguage: ['es', 'en', 'zh'],
            },
        ],
    }
}
