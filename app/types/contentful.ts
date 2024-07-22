export interface Post {
    seoTitle: string
    seoDescription: string
    content: string
    headerImgUrl?: string
    categories: string[]
    createdAt?: string
    updatedAt?: string
    formattedCreatedAt?: string
    formattedUpdatedAt?: string
    readingTime?: string
    hookTitle?: string
    hookDescription?: string
    slug?: string
    sections?: { id: string; text: string }[]
}

export interface Project {
    seoTitle: string
    categories: string[]
    img: any
    imgUrl: string
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
