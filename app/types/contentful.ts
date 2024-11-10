export interface ContentfulFilters {
    contentType: string
    where?: string
    select?: string[]
    order?: string
    limit?: number
}

export interface JobOffer {
    seoTitle: string
    seoDescription: string
    content: string
    isOpen: boolean
    skills: string[]
    createdAt?: string
    updatedAt?: string
    formattedCreatedAt?: string
    formattedUpdatedAt?: string
    maxCompensationPerHour: number
}

export interface Post {
    seoTitle: string
    seoDescription: string
    content: string
    headerImg: any
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
    sections?: { id: string; text: string; level: number }[]
}

export interface Project {
    seoTitle: string
    categories: string[]
    url: string
    img: any
    imgUrl: string
}

export interface Service {
    seoTitle: string
    seoDescription: string
    content: string
    headerImg: any
    headerImgUrl: string
    slug: string
    createdAt?: string
    updatedAt?: string
    adTitle: string
    adDescription: string
    faqs?: {
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
