export interface Post {
    seoTitle: string
    seoDescription: string
    content: string
    headerImgUrl?: string
    categories: string[]
    createdAt?: string
    formattedCreatedAt?: string
    updatedAt?: string
    formattedUpdatedAt?: string
    readingTime?: string
    authorName?: string
    authorAvatarUrl?: string
    slug?: string
    sections?: { id: string; text: string }[]
}

export interface Service {
    seoTitle: string
    seoDescription: string
    content: string
    headerImgUrl: string
    slug: string
    createdAt?: string
    updatedAt?: string
    adTitle: string
    adDescription: string
    faqs: {
        question: string
        answer: string
    }[]
    enabled: boolean
    cardTitle: string
    cardDescription: string
    iconString: string
}

export type ServiceCard = Pick<
    Service,
    'cardTitle' | 'cardDescription' | 'slug' | 'iconString' | 'enabled'
>
