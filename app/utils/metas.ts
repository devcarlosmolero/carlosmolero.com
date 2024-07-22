import {
    SITE_FACEBOOK_URL,
    IMAGE_KIT_BASE_URL,
    SITE_LINKEDIN_URL,
    SITE_PHONE_NUMBER,
    SITE_BASE_URL,
    SITE_EMAIL,
    SITE_NAME,
    SITE_X_HANDLE,
    SITE_X_URL,
} from '~/consts'
import { Post, Service } from '~/types/contentful'
import { BreadCrumbJsonLdItem, FAQJsonLdItem } from '~/types/metas'

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
            content: SITE_NAME,
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

export function getBusinessJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Corporation',
        name: SITE_NAME,
        url: `${SITE_BASE_URL}/`,
        logo: `${IMAGE_KIT_BASE_URL}/tr:w-28,ar-1-1/favicon.png`,
        sameAs: [SITE_X_URL, SITE_LINKEDIN_URL, SITE_FACEBOOK_URL],
        contactPoint: [
            {
                '@type': 'ContactPoint',
                telephone: SITE_PHONE_NUMBER,
                contactType: 'customer service',
                email: SITE_EMAIL,
                availableLanguage: 'es',
            },
        ],
    }
}

export function getBreadcrumbJsonLd(items: BreadCrumbJsonLdItem[]) {
    return {
        '@context': 'https://schema.org/',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item) => ({
            '@type': 'ListItem',
            ...item,
        })),
    }
}

export function getArticleJsonLd(post: Post, postImageUrls: string[]) {
    return {
        '@context': 'https://schema.org/',
        '@type': 'article',
        headline: post.seoTitle,
        description: post.seoDescription,
        image: postImageUrls.map((url) => ({
            '@type': 'ImageObject',
            url: url,
            width: '1366',
            height: '768',
        })),
        author: {
            '@type': 'Organization',
            name: SITE_NAME,
        },
        publisher: {
            '@type': 'Corporation',
            name: SITE_NAME,
            logo: {
                '@type': 'ImageObject',
                url: `${IMAGE_KIT_BASE_URL}/tr:w-28,ar-1-1/favicon.png`,
                width: '28',
                height: '28',
            },
        },
        datePublished: post.createdAt,
    }
}

export function getProductServiceJsonLd(
    service: Service,
    reviews: { author: string; body: string }[]
) {
    return {
        '@context': 'http://schema.org',
        '@type': 'LocalBusiness',
        name: 'NovaScript',
        image: `${IMAGE_KIT_BASE_URL}/tr:f-webp/meta.png`,
        telephone: SITE_PHONE_NUMBER,
        email: SITE_EMAIL,
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'C. Molina Lario',
            addressLocality: 'Málaga',
            addressRegion: 'Málaga',
            postalCode: '29015',
            addressCountry: 'ES',
        },
        url: `${SITE_BASE_URL}/${service.slug}`,
        priceRange: '1000-2000€',
        description: service.seoDescription,
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5',
            reviewCount: reviews.length,
        },
        review: reviews.map((review) => ({
            '@type': 'Review',
            author: {
                '@type': 'Person',
                name: review.author,
            },
            reviewRating: {
                '@type': 'Rating',
                ratingValue: '5',
                bestRating: '5',
            },
            reviewBody: review.body,
        })),
        service: {
            '@type': 'Service',
            name: service.seoTitle,
            description: service.seoDescription,
        },
    }
}

export function getFaqsJsonLd(items: FAQJsonLdItem[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    }
}
